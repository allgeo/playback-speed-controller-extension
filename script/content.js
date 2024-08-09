(function () {
    const speedController = document.createElement("div");
    speedController.id = "speed-controller";
    speedController.innerHTML = `
    <button id="speed-decrease"><<</button>
    <span id="speed-display">1x</span>
    <button id="speed-increase">>></button>
  `;

    let currentVideoId = "";

    function injectSpeedController() {
        const youtubePlayer = document.querySelector(".html5-video-player");
        if (youtubePlayer) {
            youtubePlayer.appendChild(speedController);
            addEventListeners();
            checkForVideoChange();
        } else {
            setTimeout(injectSpeedController, 1000);
        }
    }

    function addEventListeners() {
        const videoContainer = document.querySelector(".html5-video-player");
        const speedDecrease = document.getElementById("speed-decrease");
        const speedIncrease = document.getElementById("speed-increase");

        videoContainer.addEventListener("mouseenter", showSpeedController);
        videoContainer.addEventListener("mouseleave", hideSpeedController);

        speedDecrease.addEventListener("click", () => {
            changeSpeed(-1);
        });

        speedIncrease.addEventListener("click", () => {
            changeSpeed(1);
        });
    }

    function changeSpeed(direction) {
        const video = document.querySelector("video");
        let newSpeed = Math.round(video.playbackRate * 4) / 4; // Round to nearest 0.25

        newSpeed += direction * 0.25;

        // Clamp the speed between 0.25 and 5
        newSpeed = Math.max(0.25, Math.min(5, newSpeed));

        video.playbackRate = newSpeed;
        updateSpeedDisplay();
    }

    function showSpeedController() {
        speedController.classList.add("visible");
    }

    function hideSpeedController() {
        speedController.classList.remove("visible");
    }

    function updateSpeedDisplay() {
        const speedDisplay = document.getElementById("speed-display");
        const video = document.querySelector("video");
        speedDisplay.textContent = `${video.playbackRate.toFixed(2)}x`;
    }

    function resetSpeed() {
        const video = document.querySelector("video");
        if (video) {
            video.playbackRate = 1;
            updateSpeedDisplay();
        }
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("v");
    }

    function checkForVideoChange() {
        const newVideoId = getVideoId();
        if (newVideoId !== currentVideoId) {
            currentVideoId = newVideoId;
            resetSpeed();
        }
        setTimeout(checkForVideoChange, 1000); // Check every second
    }

    injectSpeedController();
})();
