'use strict';

export const menu = () => {
  const burger = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');

  const toggleClass = () => {
    menu.classList.toggle('header__menu_active');
  };

  const deleteClass = () => {
    if (menu.classList.contains('header__menu_active')) {
      menu.classList.remove('header__menu_active');
    }
  };

  burger.addEventListener('click', toggleClass);

  menuLinks.forEach((link) => {
    link.addEventListener('click', toggleClass);
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.closest('.header__menu') && !target.closest('.header__menu-button')) {
      deleteClass();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key == 'Escape') {
      deleteClass();
    }
  });
};
