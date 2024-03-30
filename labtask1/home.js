$(document).ready(function(){
    animateText();
    animateCards();
    scrolldown();
});

function animateText() {
    var texts = document.getElementsByClassName("centerText");
    let currentIndex = 0;

    function nextText() {
        texts[currentIndex].classList.remove("activeT");
        currentIndex = (currentIndex + 1) % texts.length;
        texts[currentIndex].classList.add("activeT");
    }

    setInterval(nextText, 6000); // Change text every 6 seconds
}

function animateCards() {
    const cardList = $('#cardList');
    const clonedList = cardList.clone(true);
    cardList.after(clonedList);
    cardList.parent().addClass('storeslist'); // Add the class to the container holding both lists
    cardList.parent().css('animation', 'moveRight 30s linear infinite');
}



function scrolldown(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}
