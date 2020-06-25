window.addEventListener('load', () => {
    let form = document.getElementById('login-form'),
    
        email = form.email,
        email_div = document.getElementById('email-div'),
        email_error_log = document.getElementById('email-error-log'),
    
        password = form.password,
        password_div = document.getElementById('password-div'),
        password_error_log = document.getElementById('password-error-log'),
    
        submit = form.submit;
    
    enable = () => {
        if(email.validity.typeMismatch == false && email.value.length > 0 && password.value.length >= 8){
            submit.classList.remove('disabled');
        } else {
            submit.classList.add('disabled');
        };
    };

    valid_check = (div, error_log) => {
        if(div.classList.contains('invalid')){
            div.classList.replace('invalid', 'valid');
        } else {
            div.classList.add('valid');
        };

        if(error_log.classList.contains('visible')){
            error_log.classList.replace('visible', 'hidden');
        } else {
            error_log.classList.add('hidden');
        };
    };

    invalid_check = (div, error_log) => {
        if(div.classList.contains('valid')){
            div.classList.replace('valid', 'invalid');
        } else {
            div.classList.add('invalid');
        };

        if(error_log.classList.contains('hidden')){
            error_log.classList.replace('hidden', 'visible');
        } else {
            error_log.classList.add('visible');
        };
    };
    
    // EMAIL
    email.addEventListener('input', event => {
        if (email.validity.typeMismatch || email.value.length == 0) {
            invalid_check(email_div, email_error_log);
        } else {
            valid_check(email_div, email_error_log);
        };
        
        enable();
    });
    
    // PASSWORD
    password.addEventListener('input', event => {
        if(password.value.length >= 8){
            valid_check(password_div, password_error_log);
        } else {
            invalid_check(password_div, password_error_log);
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