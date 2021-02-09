const properties = [
    { propertyName: 'Napos lakás', price: 24500000, imegUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80' },
    { propertyName: 'Eladó ház', price: 32700000, imegUrl: 'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=999&q=80' },
    { propertyName: 'Vidéki ház', price: 15000000, imegUrl: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { propertyName: 'Felújított lakás', price: 42700000, imegUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80' },
    { propertyName: 'Panel lakás', price: 29900000, imegUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80' },
    { propertyName: 'Vidéki nyaraló', price: 120500000, imegUrl: 'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=999&q=80' },
    { propertyName: 'Kis ház', price: 107000000, imegUrl: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
];



document.addEventListener('DOMContentLoaded', () => { 
    
    const renderPropertyList = () => {
        const cardHolder = document.createElement('section');
        cardHolder.className = 'house-boxes'
        
        
        for(let i = 0; i < properties.length; i++){
            let property = properties[i];
            const article = document.createElement('article');
            const imgHolder = document.createElement('div');
            imgHolder.className = 'house-img-holder';
            const img = document.createElement('img');
            img.src = property.imegUrl;
            
            const textHolder = document.createElement('section');
            textHolder.className = 'text-holder'
            const propName = document.createElement('h3');
            propName.innerHTML = property.propertyName;
            const propPrice = document.createElement('p');
            
            propPrice.innerHTML = `<strong>Ár:  </strong> ${(property.price / 1000000).toFixed(1)} M`;
            
            const box = document.getElementById('main');
            box.appendChild(cardHolder);
            cardHolder.appendChild(article);
            
            article.appendChild(imgHolder);
            imgHolder.appendChild(img);
            
            article.appendChild(textHolder);
            textHolder.appendChild(propName);
            textHolder.appendChild(propPrice);
        }
    }


    //GET kérés

    function get(){
        const URL = 'http://localhost:3001/properties';
        const param = {
            headers: {"Content-Type": "application/json; charset=UTF-8"},
            method: 'GET',
        }
        //promise visszatérési érték

        const result = fetch(URL, param);
        result
        .then(data => data.json()) // első eset adatküldés
        .then(resp => {
            const propList = resp;
            for(property of propList) {
                properties.unshift({
                    propertyName: property.propertyName,
                    price: property.price,
                    imegUrl: property.imegUrl
                },)
                }
                renderPropertyList();
        }) //válasz érkezik, response
        .catch(err => console.log(err)) //hiba üzenetek
    }


    get();

} )




