const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const passWord = document.getElementById('password');
const passWord2 = document.getElementById('password2');

// Show Error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

//Show Success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email
function checkEmail(input){
    var re = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input,'Email không hợp lệ!!!');
    }
}

//Check required fields
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach((input)=>{
        if(input.value.trim() ===  ''){
            showError(input, `${GetFieldName(input)} is required`)
        }
        else{
            showSuccess(input)
        }
    })
}

//Check input length
function checkLength(input, min, max){
    if(input.value.trim() < min){
        showError(input, `${GetFieldName(input)} must be at leasted ${min} characters`)
    }
    else if(input.value.trim() > max){
        showError(input, `${GetFieldName(input)} must be less than ${max} characters`)
    }
    else{
        showSuccess(input)
    }
}

//Get FieldName
function GetFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check Password match
function CheckPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match')
    }
}

//Event Listerners
form.addEventListener('submit',function(e){
    e.preventDefault();

    if(checkRequired([userName,email,passWord,passWord2])){
        checkEmail(email)
        checkLength(userName, 3,15)
        checkLength(passWord, 6, 25)
        CheckPasswordMatch(passWord, passWord2)
    }
})

