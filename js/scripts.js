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
        carousel.goToSlide(0);
    } catch (error) {
        console.error("Error fetching template:", error);
    }
}

// ready function
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.site-header');
  const compactThreshold = 36;
  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-compact', window.scrollY > compactThreshold);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  const drawer = document.querySelector('.pick-line-drawer');
  const openButton = document.querySelector('#pick-line-button');
  const closeButtons = drawer.querySelectorAll('ul li wa-button');
  openButton.addEventListener('click', () => {
    drawer.open = true;
  });
  closeButtons.forEach(button => button.addEventListener('click', () => {
    drawer.open = false;
  }));

  const allLines = Object.values(TrainLine).filter(value => typeof value === 'object' && value.lineCode);;
  const randomLine = allLines[Math.floor(Math.random() * allLines.length)];
  loadLine(randomLine);

  const ealButton = document.getElementById("eal-button");
  ealButton.addEventListener("click", () => {
    loadLine(TrainLine.EAL);
  });

  const aelButton = document.getElementById("ael-button");
  aelButton.addEventListener("click", () => {
    loadLine(TrainLine.AEL);
  });

  const tclButton = document.getElementById("tcl-button");
  tclButton.addEventListener("click", () => {
    loadLine(TrainLine.TCL);
  });

  const islButton = document.getElementById("isl-button");
  islButton.addEventListener("click", () => {
    loadLine(TrainLine.ISL);
  });

  const tklButton = document.getElementById("tkl-button");
  tklButton.addEventListener("click", () => {
    loadLine(TrainLine.TKL);
  });

  const silButton = document.getElementById("sil-button");
  silButton.addEventListener("click", () => {
    loadLine(TrainLine.SIL);
  });

  const twlButton = document.getElementById("twl-button");
  twlButton.addEventListener("click", () => {
    loadLine(TrainLine.TWL);
  });

  const ktlButton = document.getElementById("ktl-button");
  ktlButton.addEventListener("click", () => {
    loadLine(TrainLine.KTL);
  });

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
