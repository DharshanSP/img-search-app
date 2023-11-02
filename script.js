const accessKey = "Y_2Euv7AH5puNQT13a89-fEohIJW8lz6mNiQ1o9JaIg";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let searchTerm = "";
let currentPage = 1;

async function searchImages() {
  searchTerm = inputEl.value;
  if (!searchTerm) {
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${searchTerm}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (currentPage === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  currentPage++;
  if (currentPage > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  currentPage = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
