import { TrainLine } from './enums.js';

async function fetchTemplate(templateUrl) {
    const response = await fetch(templateUrl);
    return response.text();
}

function createCarouselItem(templateElement, item) {
    const carouselItem = templateElement.firstElementChild.cloneNode(true);
    
    // Apply line color from TrainLine enum
    const line = TrainLine.fromCode(item.lineCode);
    const lineDrawing = carouselItem.querySelector(".line-drawing");
    lineDrawing.style.background = `linear-gradient(to bottom, transparent 20%, ${line.lineColor} 20%, ${line.lineColor} 80%, transparent 80%)`;
    
    carouselItem.querySelector(".zh-name").textContent = item.zhName;
    carouselItem.querySelector(".en-transliteration").textContent = item.enTransliteration;
    carouselItem.querySelector(".en-name").textContent = item.enName;
    carouselItem.querySelector(".jyutping").textContent = item.jyutping;
    carouselItem.querySelector(".pinyin").textContent = item.pinyin;
    const story = item.enStory ? item.enStory.replace(/\. /g, '.<br>') : '';
    carouselItem.querySelector(".en-story").innerHTML = story;
    return carouselItem;
}

async function populateCarouselItems(data) {
    const carousel = document.querySelector(".stations-carousel");
    carousel.innerHTML = "";
    const templateUrl = "components/carousel-item-template.html";
    
    try {
        const templateHtml = await fetchTemplate(templateUrl);
        const templateElement = document.createElement("div");
        templateElement.innerHTML = templateHtml;
        
        data.forEach(item => {
            const carouselItem = createCarouselItem(templateElement, item);
            carousel.appendChild(carouselItem);
        });
        syncStoryDetailsForViewport();
        carousel.goToSlide(0);
    } catch (error) {
        console.error("Error fetching template:", error);
    }
}

function syncStoryDetailsForViewport() {
    const isWideViewport = window.matchMedia("(min-width: 768px)").matches;
    document.querySelectorAll(".station-story-details").forEach((details) => {
        if (isWideViewport) {
            details.setAttribute("open", "");
            return;
        }
        details.removeAttribute("open");
    });
}

// ready function
document.addEventListener("DOMContentLoaded", function () {
  // Mobile pick-line drawer/button disabled in favor of always-visible horizontal picker.
  // const drawer = document.querySelector('.pick-line-drawer');
  // const openButton = document.querySelector('#pick-line-button');
  // if (openButton && drawer) {
  //   openButton.addEventListener('click', () => {
  //     drawer.open = true;
  //   });
  // }

  const allLines = Object.values(TrainLine).filter(value => typeof value === 'object' && value.lineCode);
  const lineByCode = new Map(allLines.map(line => [line.lineCode, line]));
  const lineButtons = document.querySelectorAll('wa-button[data-line]');
  const wideViewportQuery = window.matchMedia("(min-width: 768px)");
  wideViewportQuery.addEventListener("change", syncStoryDetailsForViewport);

  lineButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedLine = lineByCode.get(button.dataset.line);
      if (!selectedLine) {
        return;
      }
      loadLine(selectedLine);
      // if (drawer && drawer.contains(button)) {
      //   drawer.open = false;
      // }
    });
  });

  const randomLine = allLines[Math.floor(Math.random() * allLines.length)];
  loadLine(randomLine);
});

function loadLine(trainLine) {
  var filename = `data/${trainLine.lineCode}.json`;
  fetch(filename)
    .then((response) => response.json())
    .then((data) => {
      // console.debug(data);
      populateCarouselItems(data);
      const currentLineEl = document.getElementById("current-line");
      currentLineEl.innerHTML = `📌 <span class="zh">${trainLine.zhName}</span> ${trainLine.enName}`;
      currentLineEl.style.color = trainLine.lineColor;
    })
    .catch((error) => {
      // Your code to handle any errors
      console.debug("Error fetching JSON:", error);
    });
}
