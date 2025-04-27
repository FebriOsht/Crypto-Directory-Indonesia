document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news"); // Bisa diubah jadi "market-news"
  const apiKey = "cvu0g6hr01qjg136pf60cvu0g6hr01qjg136pf6g";
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;

  const categories = {
    all: "bitcoin OR crypto OR interest rates OR inflation OR economy OR stock market OR gold OR commodities OR recession OR crypto regulation OR crypto news OR artificial intelligence OR biotechnology  OR space exploration OR renewble energy OR bloomberg", 
    crypto: "bitcoin OR crypto OR blockchain OR crypto regulation OR crypto news OR crypto market sentiment OR institutional adoption of crypto OR crypto security",
    market: "stock market OR S&P OR Nasdaq OR equities OR bond yields OR major stock indices OR corporate financial statements OR fiscal policy OR interest rates OR inflation and the stock market OR stock market investor sentiment OR stock market technical analysis OR dividens",
    economy: "inflation OR CPI OR GDP OR recession OR interest rates OR FOMC OR federal reserve OR jerome powell OR global gconomic growth OR inflation rate OR monetary policy OR International Trade OR geopolitics economy OR global economy OR commodity prices OR global dept OR global Labor market OR quantitative easing OR economic growth OR quantitave tightening OR economy US",
  };

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("✅ Data Global Market:", data);

      if (!Array.isArray(data)) {
        container.innerHTML = `<p style="color:red;">⚠️ API tidak mengembalikan array berita.</p>`;
        return;
      }

      const newsCards = data.slice(0, 10).map(item => `
        <div class="news-card">
          <img src="${item.image}" alt="News">
          <h3>${item.headline}</h3>
          <p>${item.summary?.substring(0, 120) || "Tanpa ringkasan"}...</p>
          <a href="${item.url}" target="_blank">Baca Selengkapnya</a>
        </div>
      `).join("");

      container.innerHTML = newsCards;
    })
    .catch(err => {
      console.error("❌ Gagal fetch data:", err);
      container.innerHTML = `<p style="color:red;">Gagal memuat berita market global.</p>`;
    });
});

fetch(proxyUrl + apiUrl)
  .then(res => res.json())
  .then(data => {
    // lanjutkan tampilkan berita
  })
  .catch(err => console.error("Gagal fetch data:", err));