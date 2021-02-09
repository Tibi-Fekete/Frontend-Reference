let propNameInput = document.form.propName;
let propValueInput = document.form.propValue;
let propAddressInput = document.form.propAddress;



let propNameValid = false;
let propValueValid = false;
let propAddressValid = false;


propNameInput.onchange = () => {
    let propName = propNameInput.value;
    const patternPropName = /^[a-zA-Z]{7}[a-zéáöőüíűéA-ZÉÁŐÜŰÍÖÓÚ \d]{0,97}$/;
    let patternPropNameValid = propName.match(patternPropName);

    propNameValid = patternPropNameValid !== null ? true : false;
    document.querySelector('.error-prop-name').style.display = propNameValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}

propValueInput.onchange = () => {
    let propValue = propValueInput.value
    const patternPropValue = /^\d{1,9999}$/;
    let patternPropValueValid = propValue.match(patternPropValue);
    propValueValid = patternPropValueValid !== null ? true : false;
    document.querySelector('.error-value').style.display = propValueValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}

propAddressInput.onchange = () => {
    let propUrl = propAddressInput.value;
    const patternUrl = /^http?s:\/\/{1,248}/;
    let patternUrlValid = propUrl.match(patternUrl);
    propAddressValid = patternUrlValid !== null ? true : false;
    document.querySelector('.error-address').style.display = propAddressValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}


function allInputAreInValid (){
    let allInValid = true;
    if(propNameValid && propValueValid && propAddressValid){
        allInValid = false;
    }
    return allInValid;
}


//server

// button.addEventListener('click', () => {
    //     console.log('click');
    //     const property = {
        //         propName: propNameInput.value,
        //         value: propValueInput.value, 
        //         URL: propAddressInput.value
        //     }
        
        //     let jsonProp = JSON.stringify(property);
        
        //     const URL = 'http://localhost:3001/properties';
        //     const param = {
            //         headers: {"Content-Type": "application/json; charset=UTF-8"},
            //         body: jsonProp,
            //         method: 'POST',
            //     }
            //     //http 
            
            
            //     const result = fetch(URL, param);
            //     result
            //     .then(data => data.json()) // első eset adatküldés
            //     .then(resp => {
                //         const properties = resp;
                //         console.log(properties);
                //         renderUserList(properties);
                //     }) //válasz érkezik, response
                //     .catch(err => console.log(err)) //hiba üzenetek
                
                // })
                
                
const button = document.querySelector('button');
const propList = [];


button.addEventListener('click', () => {
    const prop = {
        propertyName: propNameInput.value,
        price: propValueInput.value,  
        imegUrl: propAddressInput.value
    }
    
    let jsonProp = JSON.stringify(prop);
    
    //http 
    
    const httpClient = new XMLHttpRequest();
    const URL = 'http://localhost:3001/properties';
    httpClient.open('POST', URL);
    
    httpClient.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    //lefut a hívás 
    
    httpClient.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==201){
            const savedProp =  JSON.parse(this.responseText);
            alert(savedProp.propertyName + ' saved');
        }
    }
    httpClient.send(jsonProp);

}
)




