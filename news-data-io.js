document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("crypto-news");
  const apiKey = "pub_79609187e228b167b25a523003ef1c7be2e3e";

  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("✅ Data diterima:", data);

      if (!Array.isArray(data.results)) {
        container.innerHTML = `<p style="color:red;">⚠️ Tidak ada data berita.</p>`;
        return;
      }

      const html = data.results.slice(0, 10).map(item => `
        <div class="news-card">
          <img src="${item.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="Gambar">
          <h3>${item.title}</h3>
          <p>${item.description?.substring(0, 120) || "Tanpa ringkasan"}...</p>
          <a href="${item.link}" target="_blank">Baca Selengkapnya</a>
        </div>
      `).join(""); 

      container.innerHTML = html;
    })
    .catch(err => {
      console.error("❌ Gagal memuat berita:", err);
      container.innerHTML = `<p style="color:red;">Gagal memuat berita dari NewsData.io.</p>`;
    });
});
