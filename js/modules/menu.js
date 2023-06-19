'use strict';

export const menu = () => {
  const burger = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');

  menu.style.top = `-327px`;

  const animate = ({ timing, draw, duration }) => {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      let progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  };

  const toggleClass = () => {
    menu.classList.toggle('header__menu_active');
  };

  const deleteClass = () => {
    if (menu.classList.contains('header__menu_active')) {
      menu.classList.remove('header__menu_active');
    }
    menu.style.top = `-327px`;
  };

  burger.addEventListener('click', () => {
    animate({
      duration: 500,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        menu.style.top = 120 * progress + '%';
      },
    });
    toggleClass();
  });

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
