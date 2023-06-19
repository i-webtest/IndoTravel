'use strict';

export const airplane = () => {
  const docEl = document.documentElement;
  const fly = document.createElement('div');
  let scroll = window.scrollY;

  const resizeWidth = () => {
    if (docEl.clientWidth < 758) {
      fly.style.display = 'none';
    } else {
      fly.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: url('img/airplane.svg') center/contain no-repeat;
      `;
    }
  };

  resizeWidth();

  document.body.append(fly);

  const calcPositionFly = () => {
    const maxTop = docEl.clientHeight - fly.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.scrollY * 100) / maxScroll;
    const top = maxTop * (percentScroll / 100);

    fly.style.transform = window.scrollY < scroll ? `rotate(180deg) translateY(${top}px)` : `translateY(${-top}px)`;

    scroll = window.scrollY;
  };

  window.addEventListener('scroll', () => requestAnimationFrame(calcPositionFly));

  calcPositionFly();
};
