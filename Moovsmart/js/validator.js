let nameInput = document.form.username;
let emailInput = document.form.email;
let passwordInput = document.form.password;
let rePasswordInput = document.form.repassword;


let userNameIsValid = false;
let emailIsValid = false;
let passwordIsValid = false;
let passwordsAreSame = false;

nameInput.onchange = () => {
    let username = nameInput.value;
    userNameIsValid = username.length > 5 ? true : false;
    document.querySelector('.error-username').style.display = userNameIsValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}

emailInput.onchange = () => {
    let email = emailInput.value;
    emailIsValid = email.length > 5 && email.includes('@') ? true : false;
    document.querySelector('.error-email').style.display = emailIsValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();

}

passwordInput.onchange = () => {
    let password = passwordInput.value;
    passwordIsValid = password.length > 5 ? true : false;
    document.querySelector('.error-password').style.display = passwordIsValid ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}

rePasswordInput.onchange = () => {
    let rePassword = rePasswordInput.value;
    let originPassword = passwordInput.value;
    passwordsAreSame = rePassword.length > 5  && rePassword === originPassword ? true : false;
    document.querySelector('.error-re-password').style.display = passwordsAreSame ? 'none' : 'block';
    document.querySelector('button').disabled = allInputAreInValid();
}




function allInputAreInValid (){
    let allInValid = true;
    if(userNameIsValid && emailIsValid && passwordIsValid && passwordsAreSame){
        allInValid = false;
    }
    return allInValid;
}



//server
const button = document.querySelector('button');


button.addEventListener('click', () => {
    const user = {
        name: nameInput.value,
        email: emailInput.value, 
    }
    
    let jsonUser = JSON.stringify(user);
    
    //http 
    
    const httpClient = new XMLHttpRequest();
    const URL = 'http://localhost:3001/users';
    httpClient.open('POST', URL);
    
    httpClient.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    //lefut a hívás 
    
    httpClient.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==201){
            const savedUser =  JSON.parse(this.responseText);
            alert(savedUser.name + ' saved')

            //cookie megkapja a user id-t
            
        }
    }
    httpClient.send(jsonUser);

}
)


// cookies 

function setLocalStorage(){
    localStorage.setItem('user','signed in');

}

function setCookie(userId){
    let now = new Date();
    now.setTime(now.getTime() + (1000 * 60 * 60));
    let utcString = now.toUTCString();

    document.cookie = 
}