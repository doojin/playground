const progressElement = document.querySelector('progress');
const videoElement = document.querySelector('video');
const progressLabel = document.querySelector('#progressLabel');

function updateProgress() {
    const totalVideoTime = videoElement.duration;
    const currentVideoTime = videoElement.currentTime;
    const progress = currentVideoTime / totalVideoTime;

    progressElement.value = progress;
    progressLabel.textContent = `${currentVideoTime}s.`;
}

videoElement.oncanplay = () => {
    updateProgress();
    setInterval(updateProgress, 1000);
};