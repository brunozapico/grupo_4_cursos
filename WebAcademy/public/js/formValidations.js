window.addEventListener('load', () => {
    
    let form = document.getElementById('validation'),

    prevImg = document.getElementById('js-prev-img'),
    loadImg = document.getElementById('js-load-img'),

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
    
    category_error = document.getElementById('category-error-log'),
    course_name_error = document.getElementById('courseName-error-log'),
    description_full_error = document.getElementById('description-full-error-log'),
    description_short_error = document.getElementById('description-short-error-log'),
    starts_date_erorr = document.getElementById('starts-date-error-log'),
    ends_date_error = document.getElementById('ends-date-error-log'),
    days_error = document.getElementById('days-error-log'),
    shifts_error = document.getElementById('shifts-error-log'),
    professor_error = document.getElementById('professor-error-log'),
    vacancies_error = document.getElementById('vacancies-error-log'),
    price_error = document.getElementById('price-error-log'),
    image_error = document.getElementById('image-error-log');

    /* agregar atributo disabled al boton */

    submit.setAttribute('disabled', 'disabled')
    
    /* Formateo de fecha para comparar */
    date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
    
    if (month < 10) {
        var newDate = `${day}-0${month}-${year}`
    } else {
        var newDate = `${day}-${month}-${year}`
    }
    
    /* Funcion para validar el atributo 'disabled' */
        
    enzable = () => {
        if (category.value != '0' && courseName.value.length >= 3 && description_full.value.length >= 255 && description_short.value.length >= 50 && starts_date.value > newDate && ends_date.value > starts_date.value && days.value != '0' && shifts.value != '0' && professor.value != '0' && vacancies.value >= 12 && vacancies.value <= 50 && price.value >= 1 /* &&  extName */) {
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', 'disabled');
        };
    };
    
    /* Funciones para darle color a los input y select*/
    valid_check = (data, error) => {
        if (data.classList.contains('invalid')) {
            data.classList.replace('invalid', 'valid')
            error.classList.replace('visible', 'hidden');
        } else {
            data.classList.add('valid')
            error.classList.add('hidden');
        };
    }
    
    invalid_check = (data, error) => {
        if (data.classList.contains('valid')) {
            data.classList.replace('valid', 'invalid')
            error.classList.replace('hidden', 'visible');
        } else {
            data.classList.add('invalid')
            error.classList.add('visible');
        };
    }
    
    /* Validaciones de cada select e input */
    
    //CATEGORY
    category.addEventListener('input', () => {
        if (category.value != '0') {
            valid_check(category, category_error);
        } else {
            invalid_check(category, category_error);
        };
        
        enable();
    });
    
    //NAME
    courseName.addEventListener('input', (e) => {
        if (courseName.value.length >= 3) {
            valid_check(courseName, course_name_error)
        } else {
            invalid_check(courseName,course_name_error)
        };
        
        enable();
    });
    
    //DESCRIPTION FULL
    description_full.addEventListener('input', () => {
        if (description_full.value.length >= 255) {
            valid_check(description_full, description_full_error)
        } else {
            invalid_check(description_full, description_full_error)
        };
        
        enable();
    });
    
    //DESCRIPTION SHORT
    description_short.addEventListener('input', () => {
        if (description_short.value.length >= 50) {
            valid_check(description_short, description_short_error)
        } else {
            invalid_check(description_short, description_short_error)
        };
        
        enable();
    });
    
    //STARTS DATE
    starts_date.addEventListener('input', () => {
        if (starts_date.value > newDate) {
            valid_check(starts_date, starts_date_erorr)
        } else {
            invalid_check(starts_date, starts_date_erorr)
        };
        
        enable();
    });
    
    //ENDS DATE
    ends_date.addEventListener('input', () => {
        if (ends_date.value > starts_date.value) {
            valid_check(ends_date, ends_date_error)
        } else {
            invalid_check(ends_date, ends_date_error)
        };
        
        enable();
    });
    
    //DAYS
    days.addEventListener('input', () => {
        if (days.value != '0') {
            valid_check(days, days_error)
        } else {
            invalid_check(days, days_error)
        };
        
        enable();
    });
    
    //SHIFTS
    shifts.addEventListener('input', () => {
        if (shifts.value != '0') {
            valid_check(shifts, shifts_error)
        } else {
            invalid_check(shifts, shifts_error)
        };
        
        enable();
    });
    
    //PROFESSOR
    professor.addEventListener('input', () => {
        if (professor.value != '0') {
            valid_check(professor, professor_error)
        } else {
            invalid_check(professor, professor_error)
        };
        
        enable();
    });
    
    //VACANCIES
    vacancies.addEventListener('input', () => {
        if (vacancies.value >= 12 && vacancies.value <= 50) {
            valid_check(vacancies, vacancies_error)
        } else {
            invalid_check(vacancies, vacancies_error)
        };
        
        enable();
    });
    
    //PRICE
    price.addEventListener('input', () => {
        if (price.value >= 1) {
            valid_check(price, price_error)
        } else {
            invalid_check(price, price_error)
        };
        
        enable();
    });
    
    //IMAGE
    image.addEventListener('change', event => {
        let string = event.target.value;
        let ext = string.slice((string.length - 4),);
        
        let extName;
        if (ext === '.jpg' || ext === 'jpeg' || ext === '.png' || ext === '.gif') {
            extName = true
        } else {
            extName = false
        };
        
        if (extName) {
            valid_check(image, image_error)
        } else {
            event.target.value = null;
            invalid_check(image, image_error)
        };
        
        prevImg.classList.add('hidden')

        let imagenCargada = image.files[0]
        let objetURL = URL.createObjectURL(imagenCargada);
        loadImg.src = objetURL;     

        enable();
    });


    
    /* SUBMIT  */
    submit.addEventListener('click', event => {
        if (submit.hasAttribute('disabled')) {
            event.preventDefault();
        };
    });
});