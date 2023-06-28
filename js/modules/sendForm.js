'use strict';

import { errorModal } from './errorModal.js';
import { modal } from './modal.js';

export const sendForm = () => {
  const form = document.querySelector('.reservation__form');
  const inputName = form.querySelector('#reservation__name');
  const inputPhone = form.querySelector('#reservation__phone');

  const reservationData = form.querySelector('.reservation__data');
  const reservationPrice = form.querySelector('.reservation__price');

  inputName.setAttribute('name', 'name');
  inputPhone.setAttribute('name', 'phone');

  const fetchRequest = async (url, { method = 'GET', callback, body, headers }) => {
    try {
      const options = {
        method,
      };

      if (body) options.body = JSON.stringify(body);
      if (headers) options.headers = headers;

      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        if (callback) callback(null, data);
        return;
      }

      throw new Error(response.status);
    } catch (err) {
      callback(err);
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        title: form.title.value,

        dates: form.dates.value,
        people: form.people.value,
        name: form.name.value,
        phone: form.phone.value,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          errorModal();
          return;
        }
        // form.textContent = `Заявка успешно отправлена, номер заявки ${data.id}`;
        modal();
        form.reset();
        reservationData.textContent = '';
        reservationPrice.textContent = '';
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  });
};
