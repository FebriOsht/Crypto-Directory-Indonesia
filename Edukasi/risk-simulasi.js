document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("quiz-container");
  const eduCards = document.querySelectorAll(".edu-card");

  // Generate quiz dynamically
  if (typeof questionsData !== "undefined") {
    const form = document.createElement("form");
    form.id = "risk-form";
    form.innerHTML = questionsData.map((q, i) => `
      <div style="margin-bottom: 20px;">
        <p style="font-weight: 600;">${q.q}</p>
        ${q.options.map((opt, j) => `
          <label style="display:block; margin-left: 10px;">
            <input type="radio" name="q${i + 1}" value="${j + 1}" required> ${opt}
          </label>
        `).join("")}
      </div>
    `).join("") + `
      <div style="text-align:center; margin-top: 30px;">
        <button type="submit" class="btn">🎯 Lihat Rekomendasi</button>
        <button type="button" class="btn" id="reset-btn" style="margin-left: 10px; background:#444;">🔄 Tampilkan Semua</button>
      </div>
    `;

    formContainer.appendChild(form);

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      let score = 0;
      for (let value of data.values()) score += parseInt(value);

      let level = "pemula";
      if (score > 20 && score <= 26) level = "menengah";
      if (score > 26) level = "lanjutan";

      eduCards.forEach(card => {
        card.style.display = card.dataset.level === level ? "block" : "none";
      });

      const resultTitle = document.createElement("p");
      resultTitle.innerHTML = `🎓 Level kamu: <strong>${level.toUpperCase()}</strong> — berikut rekomendasi materi untuk kamu 👇`;
      resultTitle.style.color = "#f39c12";
      resultTitle.style.textAlign = "center";
      resultTitle.style.marginTop = "30px";
      formContainer.appendChild(resultTitle);

      document.getElementById("edu-list").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      eduCards.forEach(card => card.style.display = "block");
    });
  }
});
