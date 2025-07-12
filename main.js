let screenTime = 0;
let timeLeft = 0;
let timer;

function setScreenTime() {
  screenTime = document.getElementById("screen-time").value;
  timeLeft = screenTime * 60;

  document.getElementById("time-left").innerText = `Time Left: ${screenTime} minutes`;

  if (timer) clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time-left").innerText = `Time Left: ${minutes} minute(s) ${seconds} second(s)`;
  } else {
    clearInterval(timer);
    alert("Screen time exceeded! Session ending.");
    document.body.innerHTML = "<h1>⏰ Screen Time Over</h1><p>Please take a break!</p>";
  }
}
