window.addEventListener('load', () => {
    let form = document.getElementById('login-form'),
    
        email = form.email,
        email_div = document.getElementById('email-div'),
        email_error_log = document.getElementById('email-error-log'),
    
        password = form.password,
        password_div = document.getElementById('password-div'),
        password_error_log = document.getElementById('password-error-log'),
    
        submit = form.submit;
    
    // FUNCTIONS
    enable = () => {
        if(email.validity.typeMismatch == false && email.value.length > 0 && password.value.length >= 8){
            submit.classList.remove('disabled');
        } else {
            submit.classList.add('disabled');
        };
    };

    const validator_params = ['valid', 'invalid', 'visible', 'hidden'];
    validator = (a, b, c) => {
        if(a.classList.contains(b)){
            a.classList.replace(b, c);
        } else {
            a.classList.add(c);
        };
    };

    valid_check = (div, error_log, params) => {
        validator(div, params[1], params[0]);
        validator(error_log, params[2], params[3]);
    };
    invalid_check = (div, error_log, params) => {
        validator(div, params[0], params[1]);
        validator(error_log, params[3], params[2]);
    };
    submit_check = () => {
        if(submit.classList.contains('disabled')){
            event.preventDefault();
        };
    };

    // EMAIL VALIDATION
    email.addEventListener('input', event => {
        if (email.validity.typeMismatch || email.value.length == 0) {
            invalid_check(email_div, email_error_log, validator_params);
        } else {
            valid_check(email_div, email_error_log, validator_params);
        };
        
        enable();
    });
    
    // PASSWORD VALIDATION
    password.addEventListener('input', event => {
        if(password.value.length >= 8){
            valid_check(password_div, password_error_log, validator_params);
        } else {
            invalid_check(password_div, password_error_log, validator_params);
        };

        enable();
    });
    
    // SUBMIT VALIDATION
    submit.addEventListener('click', event => {
        submit_check();
    });
});