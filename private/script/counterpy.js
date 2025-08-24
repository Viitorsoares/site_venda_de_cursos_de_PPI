let amount = 0;
let total = 0;
let pricePerClick = 749; 

const btn = document.getElementById("btn")
const amountSpan = document.getElementById("quantidade")
const valueSpan = document.getElementById("valor")

btn.addEventListener("click", () => {
    amount ++;
    total = amount * pricePerClick;

    amountSpan.textContent = amount;
    valueSpan.textContent = total.toFixed(2);
})

