'use strict';

export const errorModal = () => {
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
  h2.textContent = 'Упс... Что-то пошло не так';
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
  p.textContent = 'Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз';
  p.style.cssText = `
    color: #303030;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%;
    text-align: center;
    margin-bottom: 64px;
  `;

  const button = document.createElement('button');
  button.textContent = 'Забронировать';
  button.style.cssText = `
    display: block;
    font-size: 18px;
    font-weight: 700;
    line-height: 150%;
    color: #fff;
    background-color: #FCB500;
    border-radius: 12px;
    padding: 24px 112px;
    margin: 0 auto;
  `;

  document.body.append(overlay);
  overlay.append(modalWindow);
  modalWindow.append(h2, p, button);

  const closeErrorModal = () => {
    overlay.style.display = 'none';
  };

  button.addEventListener('click', closeErrorModal);

  const showErrorModal = () => {
    overlay.style.display = 'block';
  };

  showErrorModal();
};
