document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("community-list")) {
    fetch("./data.json")
      .then(res => res.json())
      .then(data => displayCommunities(data))
      .catch(err => console.error("Fetch error:", err));
  }
});

function displayCommunities(data) {
  const container = document.getElementById("community-list");
  container.innerHTML = data.map(com => `
    <div class="community">
      <img src="${com.logo}" alt="${com.name}" class="community-logo">
      <h2>${com.name}</h2>
      <a href="detail/${com.id}.html" class="btn">Detail</a>
    </div>
  `).join("");
}



function loadCommunityDetail() {
  const id = window.location.hash.substring(1); // Ambil dari #hash

  fetch("./data.json")
    .then(res => res.json())
    .then(data => {
      const community = data.find(com => com.id == id);
      if (community) {
        document.getElementById("community-logo").src = community.logo;
        document.getElementById("community-name").textContent = community.name;
        document.getElementById("community-desc").textContent = community.description;
        document.getElementById("community-link").href = community.link;
      } else {
        document.querySelector('main').innerHTML = `<p style="color:red;">❌ Komunitas tidak ditemukan.</p>`;
      }
    })
    .catch(err => {
      console.error("Gagal load detail:", err);
      document.querySelector('main').innerHTML = `<p style="color:red;">❌ Gagal memuat data komunitas.</p>`;
    });
}

function searchCommunity() {
  const query = document.getElementById("search").value.toLowerCase();
  fetch("./data.json")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(com => com.name.toLowerCase().includes(query));
      displayCommunities(filtered);
    });
}
