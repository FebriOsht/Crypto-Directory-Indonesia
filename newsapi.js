document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news");
  const searchInput = document.getElementById("news-search");
  const categorySelect = document.getElementById("news-category");

  const apiKey = "9797490115d64b5cbbf4c5c610c7d94a";

  const categories = {
    all: "bitcoin OR crypto OR interest rates OR inflation OR economy OR stock market OR gold OR commodities OR recession OR crypto regulation OR crypto news OR artificial intelligence OR biotechnology  OR space exploration OR renewble energy OR bloomberg", 
    crypto: "bitcoin OR crypto OR blockchain OR crypto regulation OR crypto news OR crypto market sentiment OR institutional adoption of crypto OR crypto security",
    market: "stock market OR S&P OR Nasdaq OR equities OR bond yields OR major stock indices OR corporate financial statements OR fiscal policy OR interest rates OR inflation and the stock market OR stock market investor sentiment OR stock market technical analysis OR dividens",
    economy: "inflation OR CPI OR GDP OR recession OR interest rates OR FOMC OR federal reserve OR jerome powell OR global gconomic growth OR inflation rate OR monetary policy OR International Trade OR geopolitics economy OR global economy OR commodity prices OR global dept OR global Labor market OR quantitative easing OR economic growth OR quantitave tightening OR economy US",
  };

  let currentQuery = categories.all;

  function fetchNews(query) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxyUrl}https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.articles || data.articles.length === 0) {
          container.innerHTML = `<p style="color:red;">⚠️ Tidak ada berita ditemukan.</p>`;
          return;
        }

        const keyword = searchInput.value.toLowerCase();

        const filtered = data.articles.filter(item =>
          item.title.toLowerCase().includes(keyword) || item.description?.toLowerCase().includes(keyword)
        );

        container.innerHTML = filtered.slice(0, 12).map(item => `
          <div class="news-card">
            <img src="${item.urlToImage || 'img/default-news.jpg'}" alt="News">
            <h3>${item.title}</h3>
            <p>${item.description?.slice(0, 120) || 'No summary'}...</p>
            <a href="${item.url}" target="_blank">Baca Selengkapnya</a>
          </div>
        `).join("");
      })
      .catch(err => {
        console.error("❌ Fetch error:", err);
        container.innerHTML = `<p style="color:red;">❌ Gagal memuat berita.</p>`;
      });
  }

  // Initial load
  fetchNews(currentQuery);

  // Filter change
  categorySelect.addEventListener("change", () => {
    currentQuery = categories[categorySelect.value];
    fetchNews(currentQuery);
  });

  // Search input
  searchInput.addEventListener("input", () => {
    fetchNews(currentQuery);
  });
});
