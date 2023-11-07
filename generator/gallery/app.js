try {
  fetch("/api/gallery")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        renderArtworks(data);
      } else {
        console.error("Failed to fetch data:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} catch (error) {
  console.error("Error fetching data:", error);
}

function renderArtworks (data) {
  const galleryEl = document.querySelector("#gallery");
  data.map((datum) => {
    datum.price = datum.description.length;
  });

  // data.map() = [1, 2, 3] -> ['11', '22', '33']
  // array.join(',')  = '11,22,33'

  const galleryInnerHTML = data
    .map((datum) => {
      return `<div class="artwork">
              <img src="${datum.img}">
              <div class="description">
                  <h2>${datum.title}</h2>
                  <p>${datum.description}</p>
              </div>
          </div>`;
    })
    .join("");

  galleryEl.innerHTML = galleryInnerHTML;

}
