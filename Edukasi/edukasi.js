document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("edu-list");

  const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss";

  fetch(rssUrl)
    .then(res => res.json())
    .then(data => {
      const items = data.items.filter(item =>
        item.categories.some(cat => /education|learning|tutorial/i.test(cat))
      );

      container.innerHTML = items.slice(0, 8).map(item => `
        <div class="edu-card">
          <img src="${item.thumbnail || 'img/default-edu.jpg'}" alt="cover">
          <h3>${item.title}</h3>
          <p>${item.description?.slice(0, 120)}...</p>
          <a href="${item.link}" target="_blank" class="btn">Baca Selengkapnya</a>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error("❌ Gagal load RSS:", err);
      container.innerHTML = "<p style='color:red;'>Tidak bisa memuat artikel edukasi.</p>";
    });
});
