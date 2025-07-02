const countryList = {
    // "USD": "US",
    // "INR": "IN",
    // "EUR": "EU",
    // "AUD": "AU",
    // "GBP": "GB",
    // "CAD": "CA",
    // "JPY": "JP"
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
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
    displayHistory(); //##
    updateChart();      //##
});

form.addEventListener("submit", e => {
    e.preventDefault();
    getExchangeRate();
    updateChart();  //##
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
            fetchAndPlotHistory(fromCurr.value, toCurr.value);   
            // const total = data.result.toFixed(2);
            // exchangeRateTxt.innerText = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
            // saveHistory(`${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`);
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
console.log("From:", fromCurr, "To:", toCurr);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let chartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    // Initialize with default conversion
    convertCurrency();
    // Initialize chart with default currencies
    fetchAndPlotHistory("USD", "INR");
    
    // Add event listeners for currency changes
    document.getElementById("fromCurrency").addEventListener("change", updateChart);
    document.getElementById("toCurrency").addEventListener("change", updateChart);
});

function updateChart() {
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    fetchAndPlotHistory(from, to);
}

async function fetchAndPlotHistory(from, to) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // Last 7 days

    const formatDate = (date) => date.toISOString().split("T")[0];
    const startStr = formatDate(startDate);
    const endStr = formatDate(endDate);

    const url = `https://api.exchangerate.host/timeseries?start_date=${startStr}&end_date=${endStr}&base=${from}&symbols=${to}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            console.error("API Error:", data.error);
            return;
        }

        if (data.rates) {
            const dates = Object.keys(data.rates).sort();
            const rates = dates.map(date => data.rates[date][to]);

            plotChart(dates, rates, from, to);
        }
    } catch (error) {
        console.error("Error fetching historical data:", error);
    }
}

function plotChart(labels, data, from, to) {
    const ctx = document.getElementById("trendChart").getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels.map(date => new Date(date).toLocaleDateString()),
            datasets: [{
                label: `${from} to ${to} Exchange Rate`,
                data,
                borderColor: "#fdd835",
                backgroundColor: "rgba(253, 216, 53, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.body).color
                    }
                },
                tooltip: {
                    mode: "index",
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(6)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.body).color
                    }
                },
                y: {
                    grid: {
                        color: document.body.classList.contains("dark-mode") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                        color: getComputedStyle(document.body).color,
                        callback: function(value) {
                            return value.toFixed(4);
                        }
                    }
                }
            },
            interaction: {
                mode: "nearest",
                axis: "x",
                intersect: false
            }
        }
    });
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return
    }

    try {
        const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById("result").value = data.result.toFixed(4);
        } else {
            console.error("Conversion error:", data.error);
            alert("Error in conversion. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch exchange rate. Please try again.");
    }
}

function swapCurrencies() {
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");
    const temp = fromSelect.value;
    
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    convertCurrency();
    updateChart();
}

//added
// document.addEventListener("DOMContentLoaded", () => {
//   const fromSelect = document.getElementById("fromCurrency");
//   const toSelect = document.getElementById("toCurrency");
//   const ctx = document.getElementById("rateChart").getContext("2d");
//   let chart;
//   async function fetchExchangeHistory(from, to) {
//     const endDate = new Date();
//     const startDate = new Date();
//     startDate.setDate(endDate.getDate() - 6);

//     const formatDate = (date) => date.toISOString().split("T")[0];
//     const startStr = formatDate(startDate);
//     const endStr = formatDate(endDate);

//     const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${from}&to=${to}`;
//     //https://api.frankfurter.app/${startStr}..${endStr}?from=${from}&to=${to}
//     //const url='https://api.frankfurter.app/2024-06-05..2024-06-12?from=USD&to=INR';
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         const labels = Object.keys(data.rates).sort();
//         const rates = labels.map(date => data.rates[date][to]);

//         return { labels, rates };
//     } catch (err) {
//         console.error("Fetch error:", err);
//         return { labels:[], rates:[]};
//     }
//   }

  
//   async function updateChart() {
//     const from = fromCurr.value;
//     const to = toCurr.value;
//     const { labels, rates } = await fetchExchangeHistory(from, to);
//     const ctx = document.getElementById("rateChart").getContext("2d");

//     if (chart) chart.destroy();

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [{
//           label: `${from} → ${to}`,
//           data: rates,
//           borderColor: "#4caf50",
//           backgroundColor: "rgba(76, 175, 80, 0.2)",
//           tension: 0.3,
//           fill: true,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             labels: {
//               color: "#fff"
//             }
//           }
//         },
//         scales: {
//           x: {
//             ticks: {
//               //color: "#ccc"
//               color: getComputedStyle(document.body).color
//             }
//           },
//           y: {
//             ticks: {
//               //color: "#ccc"
//               color: getComputedStyle(document.body).color,
//               callback: (value) => value.toFixed(2)
//             }
//           }
//         }
//       }
//     });
//   }

//   fromSelect.addEventListener("change", updateChart);
//   toSelect.addEventListener("change", updateChart);

//   updateChart(); // Initial chart on load
// });


