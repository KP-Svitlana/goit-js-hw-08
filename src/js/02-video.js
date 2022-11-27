import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(getLocalStorageTime, 1000));

function getLocalStorageTime(data) {
  localStorage.setItem(CURRENT_TIME, data.seconds);
}

if (localStorage.getItem(CURRENT_TIME) !== null) {
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
}
