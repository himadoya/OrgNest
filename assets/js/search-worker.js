const searchInput = document.getElementById("searchInput");
  const postsList = document.getElementById("postsList");
  const defaultAuthor = "{{ site.Params.orginfo.org_name }}";
  let allPosts = [];

  fetch("/index.json")
    .then(res => res.json())
    .then(data => {
      allPosts = data;
    });

  const options = {
    keys: ["title", "content", "author"],
    threshold: 0.3,
  };

  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    const fuse = new Fuse(allPosts, options);
    const results = query ? fuse.search(query).map(r => r.item) : allPosts;

    postsList.innerHTML = results.map(post => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm border-0">
          ${post.thumbnail ? `<img src="${post.thumbnail}" class="card-img-top" alt="${post.title}">` : ""}
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">
              <small class="text-muted">
                ${new Date(post.date).toLocaleDateString()} · 
                ${post.author || defaultAuthor}
              </small>
            </p>
            <a href="${post.url}" class="btn btn-outline-primary btn-sm">Read more</a>
          </div>
        </div>
      </div>
    `).join("");
  });