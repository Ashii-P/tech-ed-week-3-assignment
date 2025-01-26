console.log("Hello");
let cookies = 1;
let CPS = 1;
const h2Tag = document.getElementById("h2Tag");
const h4Tag = document.getElementById("h4Tag");
const image = document.querySelector(".cookie-container img");
h2Tag.innerText = cookies;
h4Tag.innerText = CPS;
//allow the image to add more cookies the more it's clicked + save to local storage

image.addEventListener("click", () => {
  cookies++;
  h2Tag.innerText = cookies;
  localStorage.setItem("cookie", cookies);
});
// add sound effects for when the cookie is clicked
function clickSound() {
  const sfx = new Audio("asset/scream2.mp3");
  sfx.play();
}
image.addEventListener("click", clickSound);

//set autmoatic cookie upgrade every second + save to local storage
setInterval(() => {
  cookies += CPS;
  h2Tag.innerText = cookies;
  localStorage.setItem("cookie", cookies);
}, 1000);
//retrieve the cookie upgrade api
async function fetchShop() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  generateUI(data);
}
fetchShop();
//create function for the shop ui and ux
function generateUI(shopItems) {
  shopItems.forEach((shopItem) => {
    //create elements
    const shopContainer = document.querySelector(".shop-container");
    const itemBox = document.createElement("div");
    itemBox.setAttribute("class", "itemBox");
    const itemName = document.createElement("h3");
    itemName.setAttribute("class", "itemName");
    const itemCost = document.createElement("p");
    itemCost.setAttribute("class", "itemCost");
    const itemIncrease = document.createElement("p");
    itemIncrease.setAttribute("class", "itemIncrease");
    const buyButton = document.createElement("button");
    buyButton.setAttribute("class", "buyButton");
    buyButton.innerText = "buy";
    //change contents
    itemName.innerText = shopItem.name;
    itemCost.innerText = `Cost: 🍪 ${shopItem.cost}`;
    itemIncrease.innerText = `Power Up: ${shopItem.increase} 🌟 `;
    //Append
    itemBox.appendChild(itemName);
    itemBox.appendChild(itemCost);
    itemBox.appendChild(itemIncrease);
    itemBox.appendChild(buyButton);
    shopContainer.appendChild(itemBox);
    //Button function + save to local storage
    buyButton.addEventListener("click", () => {
      if (cookies < shopItem.cost) {
        const popup = document.querySelector(".popup-text");
        popup.classList.toggle("show");
        setTimeout(() => {
          popup.classList.remove("show");
        }, 3000);
        console.log("not enough ");
      } else {
        playBuySound();
        cookies -= shopItem.cost;
        CPS += shopItem.increase;
        h2Tag.innerText = cookies;
        h4Tag.innerText = CPS;
        localStorage.setItem("cookie", cookies);
        localStorage.setItem("cps", CPS);
      }
    });
  });
}
function playBuySound() {
  const buySfx = new Audio("asset/cash-register.mp3");
  buySfx.play();
}
//Audio toggle

const soundToggle = document.getElementById("sound-toggle");
const audioElem = document.getElementById("audio-elem");
const volumeSlider = document.getElementById("volume");
if (soundToggle.checked) {
  audioElem.play();
}
soundToggle.addEventListener("change", () => {
  if (soundToggle.checked) {
    audioElem.play();
  } else {
    audioElem.pause();
  }
});
//Audio volume
audioElem.volume = volumeSlider.value;
volumeSlider.addEventListener("input", (event) => {
  audioElem.volume = event.target.value;
});
//For menue modal and how to play modal
const modal = document.querySelector(".menue-modal");
const overlay = document.querySelector(".overlay");
const openMenueBtn = document.querySelector(".btn-open");
const closeMenueBtn = document.querySelector(".btn-close");
const htpModal = document.querySelector(".htp-modal");
const openHtpBtn = document.querySelector("#howTo");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("menue open");
};
openMenueBtn.addEventListener("click", openModal);

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  console.log("menue close");
};
closeMenueBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

const openHtpModal = () => {
  htpModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("htp");
  setTimeout(closeHtpModal, 15000);
};
const closeHtpModal = () => {
  htpModal.classList.add("hidden");
  overlay.classList.add("hidden");
};
openHtpBtn.addEventListener("click", openHtpModal);
//modal key

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//reset button
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("cookie");
  localStorage.removeItem("cps");
  cookies = 0;
  CPS = 1;
  h2Tag.innerText = cookies;
  h4Tag.innerText = CPS;
  setTimeout(closeModal, 1000);
});
