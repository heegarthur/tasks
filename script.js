if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        console.log("Service Worker geregistreerd!");
    }).catch(err => {
        console.error("Service Worker registratie mislukt:", err);
    }); 
}

const tasks = [
    "bike 10km",
    "do 300 push ups",
    "write a story",
    "app 5 different people",
    "make food",
    "walk 5km",
    "watch a looooong tutorial video",
    "take a shower",
    "learn something new",
    "make a programming project / start with coding",
    "start learning a new language",
    "make a bucket list / do something from your bucket list",
    "make a list of things you wanna do before next year and finish some of them",
    "make a time capsule for next year (online)",
    "do what you want to do",
    "choose how to waste your time for 1 hour\n and do it",
    "100 push ups",
    "go to a location to take photos",
    "make a story with 1000+ words",
    "star this GitHub: 'https://github.com/heegarthur/ivoarthur' ",
    "eat/drink something",
    "make food that you have never made before"
];

let timeInSeconds = 3600; // Standaard 1 uur
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const taskElement = document.getElementById("task");
let countdown;
let isPaused = false;

startButton.addEventListener("click", () => {
    clearInterval(countdown); // Stop de vorige timer volledig
    timeInSeconds = 1 * 3600; // Zet de timer terug op 1 uur
    sessionStorage.setItem('timeLeft', timeInSeconds); // Opslaan in sessionStorage
    
    // Random taak kiezen
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    taskElement.textContent = randomTask;

    startCountdown(); // Start de nieuwe timer
});


function startCountdown() {
    countdown = setInterval(() => {
        if (!isPaused) {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            if (timeInSeconds <= 0) {
                clearInterval(countdown);
                timerElement.textContent = "Time is up!";
                taskElement.textContent = "Task completed?";
                console.log("Done?");
            } else {
                timeInSeconds--;
                localStorage.setItem("remainingTime", timeInSeconds);
            }
        }
    }, 1000);
}

function pausebuttonc() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById("pause");
    pauseButton.textContent = isPaused ? "▶" : "||";
    sessionStorage.setItem('pause', isPaused ? 'pause' : 'play');
}

navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.action === "updateTimer") {
        startCountdown();
    }
});
window.onload = function () {
    const savedTime = sessionStorage.getItem('timeLeft');
    if (savedTime) {
        timeInSeconds = parseInt(savedTime, 10);
    }
    startCountdown();
};
