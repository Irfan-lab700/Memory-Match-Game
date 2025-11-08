let startTime, endTime;
let counter = 0;
let firstSelection = "";
let secondSelection = "";
const cards = document.querySelectorAll(".cards .card");
(function shuffleCards() {
  const cardsContainer = document.querySelector(".cards");
  const cardsArray = Array.from(cardsContainer.children);
  cardsArray.sort(() => Math.random() - 0.5);
  cardsArray.forEach(card => cardsContainer.appendChild(card));
})();
cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("clicked");
    if (counter === 0) {
      firstSelection = card.getAttribute("logo");
      counter++;
      if (!startTime) startTime = new Date();
    } else {
      secondSelection = card.getAttribute("logo");
      counter = 0;
      if (firstSelection === secondSelection) {
        const correctCards = document.querySelectorAll(
          ".card[logo='" + firstSelection + "']"
        );
        setTimeout(() => {
          correctCards[0].classList.add("checked");
          correctCards[0].classList.remove("clicked");
          correctCards[1].classList.add("checked");
          correctCards[1].classList.remove("clicked");
          const allCards = document.querySelectorAll(".card").length;
          const matchedCards = document.querySelectorAll(".card.checked").length;
          if (allCards === matchedCards) {
            endTime = new Date();
            const totalTime = ((endTime - startTime) / 1000).toFixed(1);
            updateBestTime(totalTime);
            setTimeout(() => showFinalMessage(totalTime), 300);
          }
        }, 500);
      } else {
        const incorrectCards = document.querySelectorAll(".card.clicked");
        incorrectCards[0].classList.add("shake");
        incorrectCards[1].classList.add("shake");
        setTimeout(() => {
          incorrectCards[0].classList.remove("shake", "clicked");
          incorrectCards[1].classList.remove("shake", "clicked");
        }, 800);
      }
    }
  });
});
function updateBestTime(currentTime) {
  const bestTime = localStorage.getItem("bestTime");
  if (!bestTime || currentTime < parseFloat(bestTime)) {
    localStorage.setItem("bestTime", currentTime);
  }
}
function showFinalMessage(totalTime) {
  const bestTime = localStorage.getItem("bestTime");
  const popup = document.createElement("div");
  popup.innerHTML = `
    <p style="margin:0; font-size:1.4rem;">🎉 All Cards Matched! You Win!</p>
    <p style="color:#90f5f9; margin:10px 0 5px;">⏱ Time Taken: ${totalTime} seconds</p>
    <p style="color:#00ffcc;">🏆 Best Time: ${bestTime ? bestTime + " seconds" : totalTime + " seconds"}</p>
  `;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "rgba(0, 0, 0, 0.85)";
  popup.style.color = "#00ffcc";
  popup.style.padding = "25px 35px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "1.3rem";
  popup.style.fontWeight = "bold";
  popup.style.textAlign = "center";
  popup.style.zIndex = "1000";
  popup.style.textShadow = "0 0 10px #00ffcc, 0 0 20px #00ffcc";
  const btn = document.createElement("button");
  btn.textContent = "Play Again";
  btn.style.marginTop = "15px";
  btn.style.padding = "8px 15px";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.background = "#00ffcc";
  btn.style.color = "#000";
  btn.style.fontWeight = "bold";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 0 10px #00ffcc, 0 0 20px #00ffcc";
  btn.addEventListener("click", () => {
    popup.remove();
    resetGame();
  });
  popup.appendChild(document.createElement("br"));
  popup.appendChild(btn);
  document.body.appendChild(popup);
}
function resetGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("checked", "clicked", "shake");
  });
  startTime = null;
  endTime = null;
  const cardsContainer = document.querySelector(".cards");
  const cardsArray = Array.from(cardsContainer.children);
  cardsArray.sort(() => Math.random() - 0.5);
  cardsArray.forEach(card => cardsContainer.appendChild(card));
}






