window.addEventListener('load', () => {
    let form = document.getElementById('register-form'),

        name =  form.name,
        name_div = document.getElementById('name-div'),
        name_error_log = document.getElementById('name-error-log');

        email = form.email,
        email_div = document.getElementById('email-div'),
        email_error_log = document.getElementById('email-error-log');

        password = form.password,
        password_div = document.getElementById('password-div'),
        password_error_log = document.getElementById('password-error-log');
         
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

    password_check = () => {
        if(password.value.length >= 8 && password.value === confirmPassword.value){
            valid_check(password_div, password_error_log);
            valid_check(c_password_div, c_password_error_log);
        } else {
            invalid_check(password_div, password_error_log);
            invalid_check(c_password_div, c_password_error_log);
        };

        enable();
    };

    // NAME
    name.addEventListener('input', event => {
                
        if(name.value.length >= 2){
            valid_check(name_div, name_error_log);
        } else {
            invalid_check(name_div, name_error_log);
        };

        enable();
    });

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
            if(alert.classList.contains('visible')){
                alert.classList.replace('visible', 'hidden');
            };
        } else {
            event.target.value = null;
            if(alert.classList.contains('hidden')){
                alert.classList.replace('hidden', 'visible');
            };
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