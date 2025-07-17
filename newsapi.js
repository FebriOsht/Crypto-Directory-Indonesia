document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news");
  const searchInput = document.getElementById("news-search");
  const categorySelect = document.getElementById("news-category");

  const apiKey = "9797490115d64b5cbbf4c5c610c7d94a";

  const categories = {
    all: "bitcoin OR crypto OR interest rates OR inflation OR economy OR stock market OR gold OR commodities OR recession OR crypto regulation OR crypto news OR artificial intelligence OR biotechnology  OR space exploration OR renewble energy OR bloomberg", 
    crypto: "bitcoin OR crypto OR blockchain OR crypto regulation OR crypto news OR crypto market sentiment OR institutional adoption of crypto OR crypto security OR crypto trading strategies OR crypto investment opportunities OR cryptocurrency market trends",
    market: "stock market OR S&P OR Nasdaq OR equities OR bond yields OR major stock indices OR corporate financial statements OR fiscal policy OR interest rates OR inflation and the stock market OR stock market investor sentiment OR stock market technical analysis OR dividens",
    commodities: "gold OR silver OR oil OR natural gas OR copper OR agricultural commodities OR commodity prices OR commodity market trends OR commodity trading strategies OR commodity supply and demand",
    technology: "artificial intelligence OR biotechnology OR space exploration OR renewable energy OR technology trends OR technology news OR technology companies OR technology market analysis OR technology investment opportunities",
    tradewars: "trade wars OR tariffs OR trade agreements OR international trade relations OR global supply chain disruptions OR trade negotiations OR trade imbalances OR trade sanctions OR American Trade OR China trade",
    stocks: "stock market OR S&P OR Nasdaq OR equities OR bond yields OR major stock indices OR corporate financial statements OR fiscal policy OR interest rates OR inflation and the stock market OR stock market investor sentiment OR stock market technical analysis",
  };

  let currentQuery = categories.all;

  function fetchNews(query) {

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

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
