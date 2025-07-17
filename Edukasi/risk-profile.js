const questionsData = [
  {
    q: "1. Berapa persen dana kamu siap dialokasikan untuk investasi crypto?",
    options: ["Kurang dari 10%", "10% - 25%", "Lebih dari 25%"]
  },
  {
    q: "2. Jika crypto turun 40% dalam seminggu, apa reaksimu?",
    options: ["Langsung jual semua", "Diamkan dulu sambil analisa", "Justru beli lagi (buy the dip)"]
  },
  {
    q: "3. Sudahkah kamu memahami cara kerja blockchain secara umum?",
    options: ["Belum paham sama sekali", "Sedikit paham konsepnya", "Paham dan bisa menjelaskan"]
  },
  {
    q: "4. Kamu sudah pernah menggunakan dompet crypto (wallet)?",
    options: ["Belum tahu apa itu wallet", "Pernah pakai exchange wallet", "Punya wallet non-custodial (Metamask, TrustWallet)"]
  },
  {
    q: "5. Seberapa kenal kamu dengan konsep DeFi?",
    options: ["Baru dengar", "Tahu sedikit", "Pernah pakai & paham risikonya"]
  },
  {
    q: "6. Bagaimana pemahamanmu tentang keamanan digital di crypto?",
    options: ["Belum paham", "Paham 2FA", "Pakai cold wallet & audit"]
  },
  {
    q: "7. Pernah pakai DEX (Uniswap, Pancake)?",
    options: ["Belum", "Pernah", "Aktif trading di DEX"]
  },
  {
    q: "8. Seberapa sering update info teknologi kripto?",
    options: ["Jarang", "Seminggu sekali", "Hampir setiap hari"]
  },
  {
    q: "9. Kenal dengan NFT atau token utility?",
    options: ["Belum", "Tahu tapi belum coba", "Pernah mint atau trade"]
  },
  {
    q: "10. Gimana portofoliomu?",
    options: ["Stablecoin & BTC", "Campuran BTC, ETH, alt", "Altcoin high risk + airdrop"]
  }
];

const form = document.getElementById("risk-form");

questionsData.forEach((q, i) => {
  const box = document.createElement("div");
  box.className = "question-box";
  box.innerHTML = `
    <h3>${q.q}</h3>
    ${q.options.map((opt, idx) => `
      <label><input type="radio" name="q${i}" value="${idx}" required> ${opt}</label>
    `).join("")}
  `;
  form.appendChild(box);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let total = 0;
  for (let i = 0; i < questionsData.length; i++) {
    const answer = form.querySelector(`input[name="q${i}"]:checked`);
    if (!answer) {
      alert("❗ Silakan jawab semua pertanyaan.");
      return;
    }
    total += parseInt(answer.value);
  }

  const average = total / questionsData.length;
  let profile = "pemula";
  if (average >= 2.1) profile = "advance";
  else if (average >= 1.1) profile = "menengah";

  localStorage.setItem("riskProfile", profile);
  window.location.href = "hasil-rekomenadasi.html";
});
