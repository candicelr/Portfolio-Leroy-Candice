const buttonBurger = document.getElementById('button-burger');
const menuBurger = document.getElementById('menu-burger');

buttonBurger.addEventListener('click', function () {
    menuBurger.classList.toggle('navbar__lists__list2--open');
    buttonBurger.classList.toggle('navbar__burger-button--open');
});

// test