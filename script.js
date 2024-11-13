
const BASE_URL = "https://v6.exchangerate-api.com/v6/ffd24e1ede4790697382999e/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;

  
    let flagContainer = document.createElement("div");
    flagContainer.style.display = "flex";
    flagContainer.style.alignItems = "center";

   
    let flagImg = document.createElement("img");
    flagImg.src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    flagImg.alt = `${currCode} flag`;
    flagImg.style.width = "20px";
    flagImg.style.height = "auto";
    flagImg.style.marginRight = "10px";

    
    flagContainer.appendChild(flagImg);
    flagContainer.appendChild(document.createTextNode(currCode));

   
    newOption.innerHTML = "";
    newOption.appendChild(flagContainer);

   
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}${fromCurr.value}`;
  let response = await fetch(URL);

  let data = await response.json();

  if (!data.conversion_rates) {
    msg.innerText = "Exchange rate data unavailable. Please try again later.";
    return;
  }

  let rate = data.conversion_rates[toCurr.value];
  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  msg.style.visibility = "visible";
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
