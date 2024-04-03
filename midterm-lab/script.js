const image = document.querySelector('img');

const menuItem = document.querySelector('.menu-item');

image.addEventListener('mouseover', () => {
    const mainMenu = document.querySelector('.mainmenu');

    if (mainMenu) {
        mainMenu.textContent = "IMAGE HOVERED";
    }
});