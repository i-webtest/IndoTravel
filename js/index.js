'use strict';

import { accordeon } from './modules/accordeon.js';
import { airplane } from './modules/airplane.js';
import { getData } from './modules/getData.js';
import { menu } from './modules/menu.js';
import { timer } from './modules/timer.js';

const heroTimer = document.querySelector('.timer');
const deadline = heroTimer.getAttribute('data-timer-deadline');
const timerDeadline = deadline.split('/').reverse();

timer(timerDeadline);
accordeon();
menu();
airplane();
getData();
