window.addEventListener('load', () => {
    let form = document.getElementById('register-form'),

        name =  form.name,
        name_div = document.getElementById('name-div'),
        name_error_log = document.getElementById('name-error-log');

        email = form.email,
        email_div = document.getElementById('email-div'),
        email_error_log = document.getElementById('email-error-log'),

        password = form.password,
        password_div = document.getElementById('password-div'),
        password_error_log = document.getElementById('password-error-log'),
         
        confirmPassword = form.c_password,
        c_password_div = document.getElementById('c-password-div'),
        c_password_error_log = document.getElementById('c-password-error-log');

        avatar = form.avatar,

        submit = form.submit,
        alert = document.getElementById('alert');

    enable = () => {
        if(name.value.length >= 2 && email.validity.typeMismatch == false && email.value.length > 0 && password.value.length >= 8 && password.value == confirmPassword.value){
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

    password_check = () => {
        if(password.value.length >= 8 && password.value === confirmPassword.value){
            valid_check(password_div, password_error_log, validator_params);
            valid_check(c_password_div, c_password_error_log, validator_params);
        } else {
            invalid_check(password_div, password_error_log, validator_params);
            invalid_check(c_password_div, c_password_error_log, validator_params);
        };

        enable();
    };

    // NAME
    name.addEventListener('input', event => {
        if(name.value.length >= 2){
            valid_check(name_div, name_error_log, validator_params);
        } else {
            invalid_check(name_div, name_error_log, validator_params);
        };

        enable();
    });

    // EMAIL
    email.addEventListener('input', event => {
        if (email.validity.typeMismatch || email.value.length == 0) {
            invalid_check(email_div, email_error_log, validator_params);
        } else {
            valid_check(email_div, email_error_log, validator_params);
        };

        enable();
    });

    // PASSWORD
    password.addEventListener('input', event => {
        password_check();
    });

    // CONFIRMATION
    confirmPassword.addEventListener('input', event => {
        password_check();
    })

    // AVATAR
    avatar.addEventListener('change', event => {
        let string = event.target.value;
        let ext = string.slice((string.length - 4),);
        
        if(ext === '.jpg' || ext === 'jpeg' || ext === '.png' || ext === '.gif'){
            validator(alert, 'visible', 'hidden');
        } else {
            event.target.value = null;
            validator(alert, 'hidden', 'visible');
        };

        enable();
    });

    // SUBMIT
    submit.addEventListener('click', event => {
        submit_check();
    });
});