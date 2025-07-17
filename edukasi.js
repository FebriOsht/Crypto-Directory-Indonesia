document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("edu-list");

  const url = "https://api.rss2json.com/v1/api.json?rss_url=https://cryptopotato.com/feed/";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        container.innerHTML = `<p style="color:red;">⚠️ Tidak ada artikel edukasi ditemukan.</p>`;
        return;
      }

      container.innerHTML = data.items.slice(0, 10).map(item => `
        <div class="edu-card">
          <img src="${item.thumbnail || 'img/default-edu.jpg'}" alt="Thumbnail">
          <h3>${item.title}</h3>
          <p>${item.description?.slice(0, 120).replace(/<[^>]*>?/gm, '')}...</p>
          <a href="${item.link}" target="_blank" class="btn">Baca Selengkapnya</a>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error("❌ Gagal load edukasi:", err);
      container.innerHTML = `<p style="color:red;">❌ Gagal memuat konten edukasi.</p>`;
    });
});
