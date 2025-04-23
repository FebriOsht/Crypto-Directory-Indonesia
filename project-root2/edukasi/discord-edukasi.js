document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("edu-list");

  fetch("../data/edukasi-discord.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      container.innerHTML = data.map(item => `
        <div class="edu-card">
          <img src="../${item.img}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="${item.link}" class="btn" target="_blank">🔗 Buka di Discord</a>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error("❌ Gagal load edukasi dari Discord:", err);
      container.innerHTML = "<p style='color:red;'>❌ Gagal memuat konten dari komunitas.</p>";
    });
});
