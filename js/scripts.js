function populateCarouselItems(data) {
  const carousel = document.querySelector(".stations-carousel");
  const templateUrl = "components/carousel-item-template.html";
  fetch(templateUrl)
    .then((response) => response.text())
    .then((templateHtml) => {
      // Create a temporary element to hold the template
      const templateElement = document.createElement("div");
      templateElement.innerHTML = templateHtml;

      data.forEach((item) => {
        // Clone the template
        const carouselItem = templateElement.firstElementChild.cloneNode(true);

        // Populate fields
        carouselItem.querySelector(".zh-name").textContent = item.zhName;
        carouselItem.querySelector(".en-transliteration").textContent =
          item.enTransliteration;
        carouselItem.querySelector(".en-name").textContent = item.enName;
        carouselItem.querySelector(".jyutping").textContent = item.jyutping;

// stationCode
// jyutping
// enName

        // Append the populated template to the carousel
        carousel.appendChild(carouselItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching template:", error);
    });
}

// ready function
document.addEventListener("DOMContentLoaded", function () {
  var filename = "data/EAL.json";
  fetch(filename)
    .then((response) => response.json())
    .then((data) => {
      //   console.debug(data);
      populateCarouselItems(data);
    })
    .catch((error) => {
      // Your code to handle any errors
      console.debug("Error fetching JSON:", error);
    });
});
