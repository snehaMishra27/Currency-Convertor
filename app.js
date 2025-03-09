
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const exchangeRateTxt=document.querySelector(".exchange-rate");

// for (code in countryList){
//     console.log(code);
// }
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        //console.log(currCode);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
console.log("j");
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
 };
//  console.log("K");
window.addEventListener("load",()=>{
    getExchangeRate();
})
btn.addEventListener("click",e=>{
    e.preventDefault();
    getExchangeRate();
})
//  btn.addEventListener("click",(evt) =>{
//     evt.preventDefault();//to prevent any default action by form
//     getExchangeRate();
//  });
 function getExchangeRate(){
    let amount =document.querySelector(".amount input");
    
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }


    // console.log(data);
    //let url1=`https://v6.exchangerate-api.com/v6/b1a3ba1230dee68aa49c4ce1/latest/${fromCurr.value}`;
    let url=`https://v6.exchangerate-api.com/v6/21eee6038dcc1e22322fd77f/latest/${fromCurr.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        console.log (result);
        if(result.conversion_rates){
            let exchangeRate=result.conversion_rates[toCurr.value];
            let totalExchangeRate = (amtVal*exchangeRate).toFixed(2);
        
            exchangeRateTxt.textContent=`${amtVal} ${fromCurr.value} =${totalExchangeRate} ${toCurr.value}`;
        } else{
            exchangeRateTxt.textContent="Exchange rate data unavailable.";
        }
        //console.log(totalExchangeRate);
    })
    .catch(error=>{
        exchangeRateTxt.textContent="Error fetching exchange rate.";
        console.log("ERROR:",error);
    });
 }
    
 


