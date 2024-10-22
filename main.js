const togle_button = document.querySelector('.togle-button');
const navs = document.querySelector('.navbar');

togle_button.addEventListener('click', function(){
    navs.classList.toggle('active')
})