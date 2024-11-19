document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header'); // Select the header element
    const images = [
        'img2.jpg',
        'img1.jpg',
        'img.jpg'
    ]; // List of image file paths

    let currentIndex = 0;

    function showNextImage() {
        header.style.backgroundImage = `url(${images[currentIndex]})`; // Set background image
        currentIndex = (currentIndex + 1) % images.length; // Move to the next image, loop back
    }

    // Initialize the first background image
    showNextImage();

    // Change the image every 3 seconds (3000 milliseconds)
    setInterval(showNextImage, 3000);

    const starsContainer = document.querySelector('.stars');
    const numStars = 100; // Adjust for more or fewer stars

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        starsContainer.appendChild(star);
    }

});
