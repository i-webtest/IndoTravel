'use strict';

export const timer = (deadline) => {
  const heroText = document.querySelector('.hero__text');
  const heroTimer = document.querySelector('.hero__timer');

  const timerDays = document.querySelector('.timer__count_days');
  const timerHours = document.querySelector('.timer__count_hours');
  const timerMinutes = document.querySelector('.timer__count_minutes');

  const timerUnitsDays = document.querySelector('.timer__units_days');
  const timerUnitsHours = document.querySelector('.timer__units_hours');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');

  let timerID = 0;

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;

    const days = Math.floor(timeRemaining / 60 / 60 / 24);
    const hours = Math.floor((timeRemaining / 60 / 60) % 24);
    const minutes = Math.floor((timeRemaining / 60) % 60);

    return { timeRemaining, days, hours, minutes };
  };

  const updateTimer = () => {
    const getTime = getTimeRemaining();
    const { days, hours, minutes } = getTime;

    timerDays.textContent = days;
    timerHours.textContent = hours < 10 ? `0${hours}` : hours;
    timerMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;

    if (getTime.timeRemaining <= 0) {
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      heroText.style.display = 'none';
      heroTimer.style.display = 'none';
      clearInterval(timerID);
    }

    const declination = (n, text) => {
      n = Math.abs(n) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) {
        return text[2];
      }
      if (n1 > 1 && n1 < 5) {
        return text[1];
      }
      if (n1 == 1) {
        return text[0];
      }
      return text[2];
    };

    timerUnitsDays.textContent = declination(days, ['день', 'дня', 'дней']);
    timerUnitsHours.textContent = declination(hours, ['час', 'часа', 'часов']);
    timerUnitsMinutes.textContent = declination(minutes, ['минута', 'минуты', 'минут']);
  };
  updateTimer();

  timerID = setInterval(updateTimer, 1000);
};
