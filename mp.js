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
    document.getElementById("time-left").innerText = `Time Left: ${Math.floor(timeLeft / 60)} minutes ${timeLeft % 60} seconds`;
  } else {
    clearInterval(timer);
    alert("Screen time exceeded! Shutting down...");
    document.body.innerHTML = "<h1>Screen Time Over</h1>";
  }
}
