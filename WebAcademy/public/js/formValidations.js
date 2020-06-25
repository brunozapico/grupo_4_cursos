window.addEventListener('load',() =>{

    let form = document.getElementById('validation');

         category = form.category,
         name = form.name,
         description_full = form.description_full,
         description_short = form.description_short,
         starts_date = form.starts_date,
         ends_date = form.ends_date,
         days = form.days,
         shifts = form.shifts,
         professor = form.professor,
         vacancies = form.vacancies,
         outstanding = form.outstanding,
         price = form.price,
         image = form.image,
         submit = form.submit,
         ext = image.slice((image.length -4 )),
         extName;
            if(ext === '.jpg' || ext === 'jpeg' || ext === '.png' || ext === '.gif'){
                extName =  true
            }else {
                extName = false
            };

    enable = () => {
        if(category !='0' && name.length >= 3 && description_full.length >= 255 && description_short.length >= 50 && starts_date > new Date(now) && ends_date > starts_date && days !='0' && shifts !='0' && professor !='0' && vacancies >= 12 && vacancies <= 30 && (outstanding == '0' || outstanding == '1') && price >= 1 && extName){
            submit.classList.remove('disabled');
        }else{
            submit.classList.add('disabled');
        };
    };

    valid_check = data => {
        if(data.classList.contains('invalid')){
            data.classList.replace('invalid', 'valid');
        } else {
            data.classList.add('valid');
        };
    }

    invalid_check = data => {
        if(data.classList.contains('valid')){
            data.classList.replace('valid', 'invalid');
        } else {
            data.classList.add('invalid');
        };
    }

    //CATEGORY
    category.addEventListener('select', event => {
        if(category != '0'){
            invalid_check(category);
        }else {
            valid_check(category);
        };
        
        enable();
    });

    //NAME
    name.addEventListener('input', event => {
        if(name.length >= 3){
            invalid_check(name)
        }else {
            valid_check(name)
        };

        enable();
    });

    //DESCRIPTION FULL
    description_full.addEventListener('textarea', event => {
        if(description_full.length >= 255){
            invalid_check(description_full)
        }else {
            valid_check(description_full)
        };

        enable();
    });

    //DESCRIPTION SHORT
    description_short.addEventListener('textarea', event => {
        if(description_short.length >= 50){
            invalid_check(description_short)
        }else {
            valid_check(description_short)
        };

        enable();
    });

    //STARTS DATE
    starts_date.addEventListener('input', event => {
        if(starts_date > new Date(now)){
            invalid_check(starts_date)
        }else {
            valid_check(starts_date)
        };

        enable();
    });

    //ENDS DATE
    ends_date.addEventListener('input', event => {
        if(ends_date > starts_date){
            invalid_check(ends_date)
        }else {
            valid_check(ends_date)
        };

        enable();
    });

    //DAYS
    days.addEventListener('select', event => {
        if(days !='0'){
            invalid_check(days)
        }else {
            valid_check(days)
        };

        enable();
    });

    //SHIFTS
    shifts.addEventListener('select', event => {
        if(shifts != '0'){
            invalid_check(shifts)
        }else {
            valid_check(shifts)
        };

        enable();
    });

    //PROFESSOR
    professor.addEventListener('select', event => {
        if(professor != '0'){
            invalid_check(professor)
        }else {
            valid_check(professor)
        };

        enable();
    });

    //VACANCIES
    vacancies.addEventListener('input', event => {
        if(vacancies >= 12 && vacancies <= 30){
            invalid_check(vacancies)
        }else {
            valid_check(vacancies)
        };

        enable();
    });

    //OUTSTANDING
    outstanding.addEventListener('input', event => {
        if(outstanding == '0' || outstanding == '1'){
            invalid_check(outstanding)
        }else {
            valid_check(outstanding)
        };

        enable();
    });

    //PRICE
    price.addEventListener('input', event => {
        if(price >= 1){
            invalid_check(price)
        }else {
            valid_check(price)
        };

        enable();
    });

    //IMAGE
    image.addEventListener('input', event => {
        if(extName){
            invalid_check()
        }else {
            valid_check()
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