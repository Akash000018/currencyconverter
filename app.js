const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdownselects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const forcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdownselects){
    for(currcode in countryList){
          let newoption = document.createElement("option");
          newoption.innerText = currcode;
          newoption.value = currcode;
          if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selectd";
          }else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selectd";
          }
          select.append(newoption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval <1){
        amtval = 1;
        amount.value = "1";
    }
    //  console.log(forcurr.value,tocurr.value);
    const URL = `${BASE_URL}/${forcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    
    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${forcurr.value} = ${finalamount} ${tocurr.value}`;
});

