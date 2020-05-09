const progressElement = document.querySelector('progress');
const videoElement = document.querySelector('video');
const progressLabelElement = document.querySelector('#progressLabel');
const buttonElement = document.querySelector('button');

function toggleVideo() {
    if (videoElement.paused) {
        buttonElement.textContent = 'Pause';
        videoElement.play();
    } else {
        buttonElement.textContent = 'Play';
        videoElement.pause();
    }
}

function updateProgress() {
    const totalVideoTime = videoElement.duration;
    const currentVideoTime = videoElement.currentTime;
    const progress = currentVideoTime / totalVideoTime;

    progressLabelElement.textContent = 
        `${Math.round(currentVideoTime)}s / ${Math.round(totalVideoTime)}s`;

    progressElement.value = progress;

    requestAnimationFrame(updateProgress);
}

videoElement.oncanplay = updateProgress;

buttonElement.addEventListener('click', toggleVideo);

progressElement.addEventListener('click', e => {
    const positionX = e.offsetX;
    const totalWidth = progressElement.clientWidth;
    const progress = positionX / totalWidth;

    const totalVideoTime = videoElement.duration;
    const newTime = totalVideoTime * progress;

    videoElement.currentTime = newTime;
});