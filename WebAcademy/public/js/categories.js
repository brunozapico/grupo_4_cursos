window.addEventListener('load', () => {
    let see_more = document.getElementById('see_more_btn'),
        see_less = document.getElementById('see_less_btn'),
        query = document.baseURI.slice(33, );

    if (query == '1?limit=seeMore') {
        see_more.classList.add('hidden_see');
        see_less.classList.remove('hidden_see');
    } else {
        see_less.classList.add('hidden_see');
        see_more.classList.remove('hidden_see');
    };

});