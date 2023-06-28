'use strict';

export const sendFooterForm = () => {
  const footerForm = document.querySelector('.footer__form');
  const footerFormTitle = footerForm.querySelector('.footer__form-title');
  const footerText = footerForm.querySelector('.footer__text');
  const footerInputWrap = footerForm.querySelector('.footer__input-wrap');
  const footerInput = footerForm.querySelector('.footer__input');

  footerInput.setAttribute('name', 'email');

  const httpRequest = (url, { method = 'GET', callback, body = {}, headers }) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.addEventListener('load', () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          callback(new Error(xhr.status), xhr.response);
          return;
        }

        const data = JSON.parse(xhr.response);
        if (callback) callback(null, data);
      });

      xhr.addEventListener('error', () => {
        callback(new Error(xhr.status), xhr.response);
      });

      xhr.send(JSON.stringify(body));
    } catch (err) {
      callback(new Error(err));
    }
  };

  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    httpRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        email: footerForm.email.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          footerFormTitle.style.color = 'red';
          footerFormTitle.textContent = 'Ошибка...';
          footerText.textContent = 'Что-то пошло не так, попробуйте повторить позже.';
          return;
        }

        footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
        footerText.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
        footerInputWrap.style.display = 'none';
      },

      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  });
};
