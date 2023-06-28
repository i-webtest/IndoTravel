'use strict';

export const getData = () => {
  const tourForm = document.querySelector('.tour__form');
  const tourDate = tourForm.querySelector('#tour__date');
  const tourPeople = tourForm.querySelector('#tour__people');
  const reservationForm = document.querySelector('.reservation__form');
  const reservationDate = reservationForm.querySelector('#reservation__date');
  const reservationPeople = reservationForm.querySelector('#reservation__people');
  const reservationData = reservationForm.querySelector('.reservation__data');
  const reservationPrice = reservationForm.querySelector('.reservation__price');

  reservationData.textContent = '';
  reservationPrice.textContent = '';

  const loadData = async () => {
    const result = await fetch('db.json');
    const data = await result.json();
    return data;
  };

  const renderOptions = async () => {
    const data = await loadData();

    data.forEach((item) => {
      const dateOfTour = document.createElement('option');
      dateOfTour.classList.add('tour__option');
      dateOfTour.textContent = item.date;
      dateOfTour.value = item.date;
      tourDate.append(dateOfTour);

      const dateOfReservation = document.createElement('option');
      dateOfReservation.classList.add('tour__option', 'reservation__option');
      dateOfReservation.textContent = item.date;
      dateOfReservation.value = item.date;
      reservationDate.append(dateOfReservation);
    });

    const createOptions = (minPeople, maxPeople, tour) => {
      if (tour) {
        tourPeople.textContent = '';
        tourPeople.insertAdjacentHTML(
          'beforeend',
          `
          <option value="" selected class="tour__option">
            Количество человек
          </option>
          `,
        );
      } else {
        reservationPeople.textContent = '';
        reservationPeople.insertAdjacentHTML(
          'beforeend',
          `
          <option value="" selected class="tour__option reservation__option">
            Количество человек
          </option>
          `,
        );
      }

      for (let i = minPeople; i <= maxPeople; i++) {
        if (tour) {
          const amountTourPeople = document.createElement('option');
          amountTourPeople.classList.add('tour__option');
          amountTourPeople.textContent = i;
          amountTourPeople.value = i;
          tourPeople.append(amountTourPeople);
        } else {
          const amountReservationPeople = document.createElement('option');
          amountReservationPeople.classList.add('tour__option', 'reservation__option');
          amountReservationPeople.textContent = i;
          amountReservationPeople.value = i;
          reservationPeople.append(amountReservationPeople);
        }
      }
    };

    tourDate.addEventListener('change', () => {
      const minPeopleAmount = data.find((item) => item.date === tourDate.value)['min-people'];
      const maxPeopleAmount = data.find((item) => item.date === tourDate.value)['max-people'];
      createOptions(minPeopleAmount, maxPeopleAmount, true);
    });

    reservationDate.addEventListener('change', (e) => {
      const minPeopleAmount = data.find((item) => item.date === reservationDate.value)['min-people'];
      const maxPeopleAmount = data.find((item) => item.date === reservationDate.value)['max-people'];
      createOptions(minPeopleAmount, maxPeopleAmount, false);
    });

    reservationPeople.addEventListener('change', updateInfo);
  };

  const updateInfo = async () => {
    const data = await loadData();
    const result = data.filter((item) => item.date === reservationDate.value);
    const obj = result[0];

    /*===========================*/

    const formatDate = () => {
      if (reservationDate.value !== '') {
        const dates = [];
        reservationDate.value.split('-').map((i) => {
          const split = i.split('.');
          dates.push(
            new Date(`${split[1]}.${split[0]}`).toLocaleDateString('ru-RU', { month: 'long', day: '2-digit' }),
          );
        });
        return `${dates[0]} - ${dates[1]}`;
      } else {
        return '';
      }
    };

    /*============================*/

    const people = declination(reservationPeople.value, ['человек', 'человека', 'человек']);
    const currency = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      currencyDisplay: 'narrowSymbol',
    }).format(reservationPeople.value * obj.price);

    if (reservationPeople.value) {
      // reservationData.textContent = `${reservationDate.value}, ${reservationPeople.value} ${people}`;
      reservationData.textContent = `${formatDate()}, ${reservationPeople.value} ${people}`;

      reservationPrice.textContent = currency;
    }
  };

  renderOptions();

  const declination = (n, text) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
      return text[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text[1];
    }
    if (n1 === 1) {
      return text[0];
    }
    return text[2];
  };
};
