window.addEventListener('load', () => {
    let form = document.getElementById('login-form');
    
    let email = form.email;
    let email_div = document.getElementById('email-div')
    
    let password = form.password;
    let password_div = document.getElementById('password-div')
    
    let submit = form.submit;
    
    enable = () => {
        if(email.validity.typeMismatch == false && email.value.length > 0 && password.value.length > 0){
            submit.classList.remove('disabled');
        } else {
            submit.classList.add('disabled');
        };
    };
    
    // EMAIL
    email.addEventListener('input', event => {
        if (email.validity.typeMismatch || email.value.length == 0) {
            if(email_div.classList.contains('valid')){
                email_div.classList.replace('valid', 'invalid')
            } else {
                email_div.classList.add('invalid')
            }
        } else {
            if(email_div.classList.contains('invalid')){
                email_div.classList.replace('invalid', 'valid')
            } else {
                email_div.classList.add('valid')
            }
        };
        
        enable();
    });
    
    // PASSWORD
    password.addEventListener('input', event => {
        if(password.value.length == 0){
            if(password_div.classList.contains('valid')){
                password_div.classList.replace('valid', 'invalid')
            } else {
                password_div.classList.add('invalid')
            }
        } else {
            if(password_div.classList.contains('invalid')){
                password_div.classList.replace('invalid', 'valid')
            } else {
                password_div.classList.add('valid')
            }
        };
        
        enable();
    });
    
    // SUBMIT
    submit.addEventListener('click', event => {
        if(submit.classList.contains('disabled')){
            event.preventDefault();
        };
    });
})