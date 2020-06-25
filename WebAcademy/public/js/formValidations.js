window.addEventListener('load', () => {

    let form = document.getElementById('validation');

        category = form.category,
        courseName = form.courseName,
        description_full = form.description_full,
        description_short = form.description_short,
        starts_date = form.starts_date,
        ends_date = form.ends_date,
        days = form.days,
        shifts = form.shifts,
        professor = form.professor,
        vacancies = form.vacancies,
        price = form.price,
        submit = form.submit,
        image = form.image,

        
        /* ext = image.slice((image.length - 4)),
        extName;
        if (ext === '.jpg' || ext === 'jpeg' || ext === '.png' || ext === '.gif') {
            extName = true
        } else {
            extName = false
        }; */

    enable = () => {
        if (category.value != '0' && courseName.value.length >= 3 && description_full.value.length >= 255 && description_short.value.length >= 50 && starts_date.value > new Date() && ends_date.value > starts_date.value && days.value != '0' && shifts.value != '0' && professor.value != '0' && vacancies.value >= 12 && vacancies.value <= 30 && price.value >= 1/*  && extName */) {
            submit.classList.remove('disabled');
        } else {
            submit.classList.add('disabled');
        };
    };

    valid_check = data => {
        if (data.classList.contains('invalid')) {
            data.classList.replace('invalid', 'valid');
        } else {
            data.classList.add('valid');
        };
    }

    invalid_check = data => {
        if (data.classList.contains('valid')) {
            data.classList.replace('valid', 'invalid');
        } else {
            data.classList.add('invalid');
        };
    }

    //CATEGORY
    category.addEventListener('input', () => {
        if (category.value != '0') {
            valid_check(category);
        } else {
            invalid_check(category);
        };

        enable();
    });

    //NAME
    courseName.addEventListener('input', (e) => {
        if (courseName.value.length >= 3) {
            valid_check(courseName)
        } else {
            invalid_check(courseName)
        };

        enable();
    });

    //DESCRIPTION FULL
    description_full.addEventListener('input', () => {
        if (description_full.value.length >= 255) {
            valid_check(description_full)
        } else {
            invalid_check(description_full)
        };

        enable();
    });

    //DESCRIPTION SHORT
    description_short.addEventListener('input', () => {
        if (description_short.value.length >= 50) {
            valid_check(description_short)
        } else {
            invalid_check(description_short)
        };

        enable();
    });

    //STARTS DATE

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) {
        var newDate = `${year}-0${month}-${day}`
    } else {
        var newDate = `${year}-${month}-${day}`
    }

    starts_date.addEventListener('input', () => {
        if (starts_date.value > newDate) {
            valid_check(starts_date)
        } else {
            invalid_check(starts_date)
        };

        enable();
    });

    //ENDS DATE
    ends_date.addEventListener('input', () => {
        if (ends_date.value > starts_date.value) {
            valid_check(ends_date)
        } else {
            invalid_check(ends_date)
        };

        enable();
    });

    //DAYS
    days.addEventListener('input', () => {
        if (days.value != '0') {
            valid_check(days)
        } else {
            invalid_check(days)
        };

        enable();
    });

    //SHIFTS
    shifts.addEventListener('input', () => {
        if (shifts.value != '0') {
            valid_check(shifts)
        } else {
            invalid_check(shifts)
        };

        enable();
    });

    //PROFESSOR
    professor.addEventListener('input', () => {
        if (professor.value != '0') {
            valid_check(professor)
        } else {
            invalid_check(professor)
        };

        enable();
    });

    //VACANCIES
    vacancies.addEventListener('input', () => {
        if (vacancies.value >= 12 && vacancies.value <= 30) {
            valid_check(vacancies)
        } else {
            invalid_check(vacancies)
        };

        enable();
    });

    //PRICE
    price.addEventListener('input', () => {
        if (price.value >= 1) {
            valid_check(price)
        } else {
            invalid_check(price)
        };

        enable();
    });
    image.addEventListener('change', event => {
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
        if (submit.classList.contains('disabled')) {
            event.preventDefault();
        };
    });
});
