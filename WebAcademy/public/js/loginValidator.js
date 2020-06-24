window.addEventListener('load', () => {
    let form = document.getElementById('login-form'),
    
        email = form.email,
        email_div = document.getElementById('email-div'),
    
        password = form.password,
        password_div = document.getElementById('password-div'),
    
        submit = form.submit;
    
    enable = () => {
        if(email.validity.typeMismatch == false && email.value.length > 0 && password.value.length >= 8){
            submit.classList.remove('disabled');
        } else {
            submit.classList.add('disabled');
        };
    };

    valid_check = input => {
        if(input.classList.contains('invalid')){
            input.classList.replace('invalid', 'valid');
        } else {
            input.classList.add('valid');
        };
    };

    invalid_check = input => {
        if(input.classList.contains('valid')){
            input.classList.replace('valid', 'invalid');
        } else {
            input.classList.add('invalid');
        };
    };
    
    // EMAIL
    email.addEventListener('input', event => {
        if (email.validity.typeMismatch || email.value.length == 0) {
            invalid_check(email_div);
        } else {
            valid_check(email_div);
        };
        
        enable();
    });
    
    // PASSWORD
    password.addEventListener('input', event => {
        if(password.value.length >= 8){
            valid_check(password_div);
        } else {
            invalid_check(password_div);
        };

        enable();
    });
    
    // SUBMIT
    submit.addEventListener('click', event => {
        if(submit.classList.contains('disabled')){
            event.preventDefault();
        };
    });
});