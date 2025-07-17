// /edukasi/risk.js

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
    q: "5. Seberapa kenal kamu dengan konsep DeFi (Decentralized Finance)?",
    options: ["Baru dengar", "Tahu sedikit", "Pernah pakai & paham risikonya"]
  },
  {
    q: "6. Bagaimana pemahamanmu tentang keamanan digital di crypto?",
    options: ["Belum paham", "Paham 2FA & password", "Gunakan cold wallet & audit"]
  },
  {
    q: "7. Apakah kamu pernah menggunakan DEX?",
    options: ["Belum pernah", "Pernah pakai Uniswap", "Aktif trading + testnet"]
  },
  {
    q: "8. Seberapa sering kamu mengikuti update teknologi kripto?",
    options: ["Jarang", "Seminggu sekali", "Hampir tiap hari"]
  },
  {
    q: "9. Apakah kamu mengenal dan pernah menggunakan NFT?",
    options: ["Belum pernah", "Tahu tapi belum coba", "Pernah mint/trade"]
  },
  {
    q: "10. Kalau kamu membuat portofolio crypto, kamu akan pilih?",
    options: ["Stablecoin & BTC", "Campuran BTC, ETH, altcoin", "Altcoin high-risk, airdrops"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("questions");
  questionsData.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${q.q}</p>` + q.options.map((opt, j) => `
      <label>
        <input type="radio" name="q${i}" value="${j}" required /> ${opt}
      </label>
    `).join("");
    container.appendChild(div);
  });

  document.getElementById("quiz-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;
    for (let i = 0; i < questionsData.length; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) score += parseInt(selected.value);
    }

    let level = "pemula";
    if (score >= 20 && score <= 24) level = "menengah";
    else if (score >= 25) level = "advance";

    localStorage.setItem("levelProfile", level);
    window.location.href = "hasil-rekomenadasi.html";
  });
});
