const progressElement = document.querySelector('progress');
const videoElement = document.querySelector('video');
const progressLabelElement = document.querySelector('#progressLabel');
const buttonElement = document.querySelector('button');

buttonElement.addEventListener('click', toggleVideo);

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

    progressLabelElement.textContent = 
        `${Math.round(currentVideoTime)}s / ${Math.round(totalVideoTime)}s`;

    if (!videoElement.paused) {
        const progress = currentVideoTime / totalVideoTime;
        progressElement.value = progress;
    }

    requestAnimationFrame(updateProgress);
}

videoElement.oncanplay = () => {
    updateProgress();
}