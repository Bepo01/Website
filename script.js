function showPopup(popupId) {
    // Hide all popups first
    document.querySelectorAll('.popup').forEach(popup => popup.style.display = "none");

    // Get the popup element
    let popup = document.getElementById(popupId);

    // Reset position (centered)
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";

    // Show the selected popup
    popup.style.display = "block";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

function dragPopup(event, popupId) {
    let popup = document.getElementById(popupId);

    // Ensure dragging starts **only from the header**
    if (!event.target.classList.contains("popup-header")) return;

    // Calculate the correct offset within the popup header
    let offsetX = event.clientX - popup.offsetLeft;
    let offsetY = event.clientY - popup.offsetTop;

    document.body.style.userSelect = "none"; // Prevent text selection

    function movePopup(e) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    }

    function stopDragging() {
        document.removeEventListener("mousemove", movePopup);
        document.removeEventListener("mouseup", stopDragging);
        document.body.style.userSelect = ""; // Re-enable text selection after dragging stops
    }

    document.addEventListener("mousemove", movePopup);
    document.addEventListener("mouseup", stopDragging);
}


document.addEventListener("DOMContentLoaded", function () {
    const bubble = document.getElementById("bubbleText");
    const sound = document.getElementById("bubbleSound");
    let soundPlayed = false;

    function showBubble() {
        bubble.classList.remove("hidden");
        bubble.classList.add("visible");

        // Hide bubble smoothly after 5 seconds
        setTimeout(() => {
            bubble.classList.remove("visible");
            bubble.classList.add("hidden");
        }, 5000);
    }

    function playSoundOnce() {
        if (!soundPlayed) {
            sound.pause();
            sound.currentTime = 0;

            let playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => console.log("Autoplay blocked."));
            }

            soundPlayed = true;
        }
    }

    document.addEventListener("mousemove", playSoundOnce, { once: true });

    setTimeout(showBubble, 200);
});



document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("themeToggle");
    const body = document.documentElement;

    toggleButton.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            body.classList.replace("dark-mode", "light-mode");
            localStorage.setItem("theme", "light-mode");
        } else {
            body.classList.replace("light-mode", "dark-mode");
            localStorage.setItem("theme", "dark-mode");
        }
    });
});
