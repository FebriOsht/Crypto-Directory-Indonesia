document.addEventListener("DOMContentLoaded", () => {
  const targetLevel = localStorage.getItem("userRiskLevel");
  const container = document.getElementById("edu-recommendation");
  const title = document.getElementById("user-level");

  title.textContent = `📚 Rekomendasi untuk Level: ${targetLevel?.toUpperCase() || "?"}`;

  // Fetch edukasi.html (ambil HTML-nya dulu)
  fetch("../edukasi/edukasi.html")
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const cards = doc.querySelectorAll(`.edu-card[data-level="${targetLevel}"]`);

      if (!cards.length) {
        container.innerHTML = `<p style="color:orange;">⚠️ Tidak ditemukan edukasi untuk level ini.</p>`;
        return;
      }

      cards.forEach(card => {
        container.appendChild(card.cloneNode(true));
      });
    })
    .catch(err => {
      console.error("❌ Gagal load edukasi:", err);
      container.innerHTML = `<p style="color:red;">Gagal memuat materi edukasi.</p>`;
    });
});
