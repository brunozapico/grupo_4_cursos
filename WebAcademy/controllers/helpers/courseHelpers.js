module.exports = {
    programIdBuild(days, shift) {
        
        let programID;
        
    
        if (days == 'Lunes - Miercoles - Viernes' && shift == 'm') {
            programID = 1;
        } else if (days == 'Lunes - Miercoles - Viernes' && shift == 't') {
            programID = 2;
        } else if (days == 'Lunes - Miercoles - Viernes' && shift == 'n') {
            programID = 3;
        } else if (days == 'Martes - Jueves - Sábado' && shift == 'm') {
            programID = 4;
        } else if (days == 'Martes - Jueves - Sábado' && shift == 't') {
            programID = 5;
        } else if (days == 'Martes - Jueves - Sábado' && shift == 'n') {
            programID = 6;
        }
    
        return programID
    },
    courseGenerator(name, price, starts_date, ends_date, image, vacancies, outstanding, description_short, description_full, category_id, professor_id, program_id) {
        let course = {
            name,
            price,
            starts_date,
            ends_date,
            image,
            vacancies,
            outstanding,
            description_short,
            description_full,
            category_id,
            professor_id,
            program_id
        }
    
    return course;
    
    }

}


