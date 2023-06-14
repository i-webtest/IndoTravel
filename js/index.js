'use strict';

import { accordeon } from './modules/accordeon.js';
import { timer } from './modules/timer.js';

const heroTimer = document.querySelector('.timer');
const deadline = heroTimer.getAttribute('data-timer-deadline');
const timerDeadline = deadline.split('/').reverse();

timer(timerDeadline);
accordeon();
