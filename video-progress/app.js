const progressElement = document.querySelector('progress');
const videoElement = document.querySelector('video');
const progressLabelElement = document.querySelector('#progressLabel');
const buttonElement = document.querySelector('button');

function toggleVideo() {
    videoElement.paused ? videoElement.play() : videoElement.pause();
}

function updateProgress() {
    const totalVideoTime = videoElement.duration;
    const currentVideoTime = videoElement.currentTime;
    const progress = currentVideoTime / totalVideoTime;

    progressLabelElement.textContent = 
        `${currentVideoTime.toFixed(1)}s / ${totalVideoTime.toFixed(2)}s`;

    progressElement.value = progress;

    requestAnimationFrame(updateProgress);
}

videoElement.oncanplay = updateProgress;
videoElement.addEventListener('pause', () => buttonElement.textContent = 'Play');
videoElement.addEventListener('play', () => buttonElement.textContent = 'Pause');

buttonElement.addEventListener('click', toggleVideo);

progressElement.addEventListener('click', e => {
    const positionX = e.offsetX;
    const totalWidth = progressElement.clientWidth;
    const progress = positionX / totalWidth;

    const totalVideoTime = videoElement.duration;
    const newTime = totalVideoTime * progress;

    videoElement.currentTime = newTime;
});