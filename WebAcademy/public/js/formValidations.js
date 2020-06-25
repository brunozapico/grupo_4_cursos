window.addEventListener('load', () => {

    
    
    let form = document.getElementById('validation');
    
    category = form.category,
    categoryDiv = document.getElementById('category-div'),
    name = form.name,
    nameDiv = document.getElementById('name-div'),
    description_full = form.description_full,
    descFullDiv = document.getElementById('descFull-div'),
    description_short = form.description_short,
    descShortDiv = document.getElementById('descShort-div'),
    starts_date = form.starts_date,
    startsDateDiv = document.getElementById('startsDate-div'),
    ends_date = form.ends_date,
    endsDateDiv = document.getElementById('endsDate-div'),
    days = form.days,
    daysDiv = document.getElementById('days-div'),
    shifts = form.shifts,
    shiftsDiv = document.getElementById('shifts-div'),
    professor = form.professor,
    professorDiv = document.getElementById('professor-div'),
    vacancies = form.vacancies,
    vacanciesDiv = document.getElementById('vacancies-div'),
    outstanding = form.outstanding,
    outstandingDiv = document.getElementById('outstanding-div'),
    price = form.price,
    priceDiv = document.getElementById('price-div'),
    /* image = form.image, */
    submit = form.submit,
    /* ext = image.slice((image.length - 4)),
    extName; */
    /* if (ext === '.jpg' || ext === 'jpeg' || ext === '.png' || ext === '.gif') {
        extName = true
    } else {
        extName = false
    }; */
    console.log(submit);
    
    enable = () => {
        if (category.value != '0' && name.value.length >= 3 && description_full.value.length >= 255 && description_short.value.length >= 50 && starts_date.value > new Date(now) && ends_date.value > starts_date.value && days.value != '0' && shifts.value != '0' && professor.value != '0' && vacancies.value >= 12 && vacancies.value <= 30 && (outstanding.value == '0' || outstanding.value == '1') && price.value >= 1/*  && extName */) {
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
    category.addEventListener('change', () => {
        if (category.value == '0') {
            invalid_check(category);
        } else {
            valid_check(category);
        };

        enable();
    });

    //NAME
    name.addEventListener('input', () => {
        if (name.value.length >= 3) {
            invalid_check(nameDiv)
        } else {
            valid_check(nameDiv)
        };

        enable();
    });

    //DESCRIPTION FULL
    description_full.addEventListener('input', () => {
        if (description_full.value.length >= 255) {
            invalid_check(description_full)
        } else {
            valid_check(description_full)
        };

        enable();
    });

    //DESCRIPTION SHORT
    description_short.addEventListener('input', () => {
        if (description_short.value.length >= 50) {
            invalid_check(description_short)
        } else {
            valid_check(description_short)
        };

        enable();
    });

    //STARTS DATE
    starts_date.addEventListener('change', () => {
        if (starts_date.value > new Date(now)) {
            invalid_check(starts_date)
        } else {
            valid_check(starts_date)
        };

        enable();
    });

    //ENDS DATE
    ends_date.addEventListener('change', () => {
        if (ends_date.value > starts_date.value) {
            invalid_check(ends_date)
        } else {
            valid_check(ends_date)
        };

        enable();
    });

    //DAYS
    days.addEventListener('change', () => {
        if (days.value != '0') {
            invalid_check(days)
        } else {
            valid_check(days)
        };

        enable();
    });

    //SHIFTS
    shifts.addEventListener('change', () => {
        if (shifts.value != '0') {
            invalid_check(shifts)
        } else {
            valid_check(shifts)
        };

        enable();
    });

    //PROFESSOR
    professor.addEventListener('change', () => {
        if (professor.value != '0') {
            invalid_check(professor)
        } else {
            valid_check(professor)
        };

        enable();
    });

    //VACANCIES
    vacancies.addEventListener('input', () => {
        if (vacancies.value >= 12 && vacancies.value <= 30) {
            invalid_check(vacancies)
        } else {
            valid_check(vacancies)
        };

        enable();
    });

    //OUTSTANDING
    outstanding.addEventListener('change', () => {
        if (outstanding.value == '0' || outstanding.value == '1') {
            invalid_check(outstanding)
        } else {
            valid_check(outstanding)
        };

        enable();
    });

    //PRICE
    price.addEventListener('input', () => {
        if (price.value >= 1) {
            invalid_check(price)
        } else {
            valid_check(price)
        };

        enable();
    });

    //IMAGE
    image.addEventListener('change', () => {
        if (extName) {
            invalid_check()
        } else {
            valid_check()
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