const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";


const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg');

window.addEventListener('load',()=>{
    UpdateExchangeRate();
})

for (let select of dropdowns) {
    for(currCode in countryList){ //selecting each country code in code.js and adding them as a new option in select
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
    if(select.name==='from' && currCode==='USD'){ //to display the selected option
        newOption.selected='selected';
    }else if(select.name==='to' && currCode==='INR'){
        newOption.selected='selected';
    }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target); //passing updatedFlag the info of where the update has occured
    })
}
//To change the flag as the option changes
const updateFlag= (element) => {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc='https://flagsapi.com/'+countryCode+'/flat/64.png';
    console.log(newSrc);
    let img =element.parentElement.querySelector('img'); //Changing the image of the country based on the option selected
    img.src=newSrc;
}

btn.addEventListener('click', (evt)=> {
    evt.preventDefault();
    UpdateExchangeRate();
   
});

const UpdateExchangeRate= async ()=>{
     let amount=document.querySelector('form input');
    let amtVal=amount.value;
    if(amtVal==='' || amtVal<0){
        amtVal=0;
        amount.value='0';
    }

    const URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"+fromCurr.value.toLowerCase()+".json";
    let response = await fetch(URL);
    let data = await response.json();
    const rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
    
}