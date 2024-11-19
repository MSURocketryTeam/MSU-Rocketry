const observer = new IntersectionObserver((entries) => { 
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); /* Indicates when animation should start */
        } else {
            entry.target.classList.remove('show'); /* Allows animation to continue running after being seen once */
        }
    });
});

// Select both .box1 and .box2 elements
const hiddenElements = document.querySelectorAll('.box1, .box2, .box3');
hiddenElements.forEach((el) => observer.observe(el));

function togglePopup(title, description) {
    const popup = document.getElementById("popup-1");
    popup.querySelector(".popup-text h3").textContent = title;
    popup.querySelector(".popup-text p").textContent = description;
    popup.classList.toggle("active");
}
