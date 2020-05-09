const progressElement = document.querySelector('progress');
const videoElement = document.querySelector('video');

function updateProgress() {
    const totalVideoTime = videoElement.duration;
    const currentVideoTime = videoElement.currentTime;
    const progress = currentVideoTime / totalVideoTime;
    progressElement.value = progress;
}

videoElement.oncanplay = () => {
    updateProgress();
    setInterval(updateProgress, 1000);
};