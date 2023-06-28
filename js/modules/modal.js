'use strict';

export const modal = () => {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    display: none;
    background-color: rgba(255, 255, 255, 0.67);
    padding: 20px;
    overflow-y: auto;
    cursor: pointer;
    z-index: 10;
  `;

  const modalWindow = document.createElement('div');
  modalWindow.style.cssText = `
    max-width: 980px;
    background-color: #fff;
    border-radius: 30px;
    border: 1px solid #afafaf;
    cursor: default;
    padding: 77px 77px 85px;
    margin: 0 auto;
  `;

  const h2 = document.createElement('h2');
  h2.textContent = 'Ваша заявка успешно отправлена';
  h2.style.cssText = `
    max-width: 580px;
    color: #303030;
    text-align: center;
    font-size: 34px;
    line-height: 150%;
    letter-spacing: 0.68px;
    margin: 0 auto 40px;
  `;

  const p = document.createElement('p');
  p.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
  p.style.cssText = `
    color: #303030;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%;
    text-align: center;
    margin-bottom: 64px;
  `;

  const circle = document.createElement('div');
  circle.style.cssText = `
    width: 100px;
    height: 100px;
    background-image: url('../../img/done.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #78EC6E;
    border-radius: 50%;
    margin: 0 auto;
  `;

  document.body.append(overlay);
  overlay.append(modalWindow);
  modalWindow.append(h2, p, circle);

  const closeModal = () => {
    overlay.style.display = 'none';
  };

  const showModal = () => {
    overlay.style.display = 'block';

    setInterval(closeModal, 2000);
  };

  showModal();
};
