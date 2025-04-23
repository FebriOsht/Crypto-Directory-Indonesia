document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news");
  const apiKey = "79609187e228b167b25a523003ef1c7be2e3e"; // ganti sama API key kamu
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=crypto&language=id`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("📡 DATA:", data);

      if (!data.results || !Array.isArray(data.results)) {
        container.innerHTML = `<p style="color:red;">⚠️ Tidak ada hasil dari API</p>`;
        return;
      }

      const newsCards = data.results.slice(0, 10).map(item => `
        <div class="news-card">
          <img src="${item.image_url || 'img/default-news.jpg'}" alt="News">
          <h3>${item.title}</h3>
          <p>${item.description?.slice(0, 120) || 'Tanpa deskripsi'}...</p>
          <a href="${item.link}" target="_blank">Baca Selengkapnya</a>
        </div>
      `).join("");

      container.innerHTML = `<div class="news-grid">${newsCards}</div>`;
    })
    .catch(err => {
      console.error("❌ Gagal fetch:", err);
      container.innerHTML = `<p style="color:red;">Gagal mengambil berita. Cek API Key / jaringan.</p>`;
    });
});
