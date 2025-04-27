document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("community-list")) {

    fetch("data.json")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => displayCommunities(data))
      .catch(err => console.error("Fetch error:", err));
  }
  if (window.location.pathname.includes("detail.html")) {
    loadCommunityDetail();
  }
  if (document.getElementById("community-list")) {
    loadCommunityList();
  }
  if (document.getElementById("community-name")) {
    loadCommunityDetail();
  }
});

function displayCommunities(data) {
  const container = document.getElementById("community-list");
  container.innerHTML = data.map(com => `
    <div class="community">
      <img src="${com.logo}" alt="${com.name}" class="community-logo">
      <h2>${com.name}</h2>
      <p>${com.description}</p>
      <a href="detail.html#${com.id}" class="btn">Detail</a>
    </div>
  `).join("");
}


// 🔥 Menampilkan daftar komunitas di `community.html`
function loadCommunityDetail() {
  const id = window.location.hash.substring(1); // Ganti dari searchParams jadi hash

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const community = data.find(com => com.id == id);
      if (community) {
        document.getElementById("community-logo").src = community.logo;
        document.getElementById("community-name").textContent = community.name;
        document.getElementById("community-desc").textContent = community.description;
        document.getElementById("community-link").href = community.link;
      }
    })
    .catch(err => {
      console.error("Gagal load detail:", err);
      document.querySelector('main').innerHTML = `<p style="color:red;">❌ Gagal memuat detail komunitas.</p>`;
    });
}


// 🔥 Menampilkan detail komunitas di `detail.html`
function loadCommunityDetail() {
  const pageId = window.location.pathname.split("/").pop().replace(".html", ""); // Ambil nama file
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Jika halaman adalah akademi-crypto.html, jangan load dari data.json
  if (window.location.pathname.includes("akademi-crypto.html")) {
    document.getElementById("community-name").textContent = "Akademi Crypto";
    return;
  }

  fetch("../data.json")
    .then(res => res.json())
    .then(data => {
      const community = data.find(com => com.id == id);
      if (community) {
        document.getElementById("community-logo").src = community.logo;
        document.getElementById("community-logo").alt = community.name;
        document.getElementById("community-name").textContent = community.name;
        document.getElementById("community-desc").textContent = community.description;
        document.getElementById("community-link").href = community.link;
      }
    })
    .catch(err => console.error("Gagal memuat detail komunitas:", err));
}

function searchCommunity() {
  const query = document.getElementById("search").value.toLowerCase();
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(com => com.name.toLowerCase().includes(query));
      displayCommunities(filtered);
    });
}

