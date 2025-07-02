const countryList = {
    "USD": "US",
    "INR": "IN",
    "EUR": "EU",
    "AUD": "AU",
    "GBP": "GB",
    "CAD": "CA",
    "JPY": "JP"
};

const dropdowns = document.querySelectorAll(".currency-select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const exchangeRateTxt = document.querySelector(".exchange-rate");
const form = document.getElementById("converterForm");

dropdowns.forEach(select => {
    for (currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.text = currCode;
        select.appendChild(option);
    }

    select.addEventListener("change", e => updateFlag(e.target));
});

function updateFlag(element) {
    const countryCode = countryList[element.value];
    const img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

window.addEventListener("load", () => {
    updateFlag(fromCurr);
    updateFlag(toCurr);
    displayHistory();
    getExchangeRate();
});

form.addEventListener("submit", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    const amountInput = document.getElementById("amount");
    let amtVal = amountInput.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    const url = `https://v6.exchangerate-api.com/v6/21eee6038dcc1e22322fd77f/latest/${fromCurr.value}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[toCurr.value];
            const total = (amtVal * rate).toFixed(2);
            exchangeRateTxt.innerText = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
            saveHistory(`${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`);
        })
        .catch(() => {
            exchangeRateTxt.innerText = "Failed to fetch exchange rate.";
        });
}

function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.unshift(entry);
    if (history.length > 5) history.pop();
    localStorage.setItem("history", JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    displayHistory();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function openPopup(id) {
    document.getElementById(id).style.display = "block";
}
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}


