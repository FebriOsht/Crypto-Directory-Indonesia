document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news"); // Bisa diubah jadi "market-news"
  const apiKey = "cvu0g6hr01qjg136pf60cvu0g6hr01qjg136pf6g";
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;

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
