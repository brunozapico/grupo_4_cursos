window.addEventListener('load', () => {
    let form = document.getElementById('register-form'),

        name =  form.name,
        name_div = document.getElementById('name-div'),

        email = form.email,
        email_div = document.getElementById('email-div'),  

        password = form.password,
        password_div = document.getElementById('password-div'),
         
        confirmPassword = form.c_password,
        c_password_div = document.getElementById('c-password-div'),

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

    valid_check = input => {
        if(input.classList.contains('invalid')){
            input.classList.replace('invalid', 'valid');
        } else {
            input.classList.add('valid');
        };
    }

    invalid_check = input => {
        if(input.classList.contains('valid')){
            input.classList.replace('valid', 'invalid');
        } else {
            input.classList.add('invalid');
        };
    }

    password_check = () => {
        if(password.value.length >= 8 && password.value === confirmPassword.value){
            valid_check(password_div);
            valid_check(c_password_div);
        } else {
            invalid_check(password_div);
            invalid_check(c_password_div);
        };

        enable();
    }

    // NAME
    name.addEventListener('input', event => {
                
        if(name.value.length >= 2){
            valid_check(name_div);
        } else {
            invalid_check(name_div);
        };

        enable();
    });

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