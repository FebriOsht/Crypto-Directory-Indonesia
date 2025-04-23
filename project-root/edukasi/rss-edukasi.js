document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("edu-list");

  fetch("../data/pintu-edukasi.json")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = data.map(item => `
        <div class="edu-card">
          <img src="${item.img}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="${item.link}" target="_blank" class="btn">Baca Selengkapnya</a>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error("❌ Gagal load edukasi dari Pintu:", err);
      container.innerHTML = "<p style='color:red;'>Tidak bisa memuat artikel edukasi dari Pintu.</p>";
    });
});
