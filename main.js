const darkMode = document.querySelector(".btn");
const body = document.getElementsByTagName("body");
const sym = document.querySelector(".symbol");
const title = document.querySelector(".title");
const symURL = {
  url1: "./browser-extensions-manager-ui-main/browser-extensions-manager-ui-main/assets/images/icon-sun.svg",
  url2: "./browser-extensions-manager-ui-main/browser-extensions-manager-ui-main/assets/images/icon-moon.svg",
};

function modeFunction() {
  body[0].style.background =
    "linear-gradient(180deg, #040918 0%, #091540 100%)";
  sym.src = symURL.url1;
  darkMode.style.background = "hsl(226, 25%, 17%)";
  title.style.color = "#fff";
}

let toggleSate = true;
darkMode.addEventListener("click", () => {
  if (toggleSate) {
    modeFunction();
  } else if (!toggleSate) {
    body[0].style.background =
      "linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)";
    sym.src = symURL.url2;
    darkMode.style.background = "#ccc";
    title.style.color = "#000";
  }
  toggleSate = !toggleSate;
  console.log(toggleSate);
});

async function getData(url) {
  let fetchData = new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject("error loading data");
          }
        };
        xhr.send();
      }, 3000);
    } catch (error) {
      console.log("there is somthing worng ");
    }
  });
  let fetced = await fetchData;

  // console.log(fetced);

  let card = document.querySelector(".extensions-grid");
  const cards = document.querySelectorAll(".extension-card");
  console.log(cards);

  function printData() {
    let displayCard = "";
    let getJsonData = JSON.parse(fetced);

    for (const dataRender of getJsonData) {
      displayCard += `<div class=${"extension-card"}>
              <div class="card-header">
                <div class="icon">  <img src="./browser-extensions-manager-ui-main//browser-extensions-manager-ui-main/${
                  dataRender.logo
                }" alt="" /></div>
                <h3>${dataRender.name}</h3>
              </div>
              <p>${dataRender.description}</p>
              <div class="card-footer">
                <button class="remove">Remove</button>
                <label class="switch">
                  <input type="checkbox" checked />
                  <span class="slider"></span>
                </label>
              </div>
            </div>`;
    }

    card.innerHTML = displayCard;
  }

  printData();
}

getData(
  "./browser-extensions-manager-ui-main/browser-extensions-manager-ui-main/data.json"
).then(() => {
  // handling loader animation
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
});
