const togle_button = document.querySelector('.togle-button');
const navs = document.querySelector('.navbar');

togle_button.addEventListener('click', function(){
    navs.classList.toggle('active')
})


// Hero section 

const figure = document.getElementById('image-container');

const img = document.createElement('img');

img.src = 'https://raw.githubusercontent.com/code-banu/my-first-project/refs/heads/main/assets/images/pasta2.avif';

figure.appendChild(img);

const images = [
    'https://raw.githubusercontent.com/code-banu/my-first-project/refs/heads/main/assets/images/pasta2.avif',
    'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D'
];

let currentIndex = 0;

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    img.src = images[currentIndex];
}

setInterval(changeImage, 3000);

