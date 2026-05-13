const wordToSentence = {
  dreaming: "A mysterious man arrives at ancient ruins with the singular goal of dreaming a human being into existence.",
  creates: "Through intense concentration and repeated dreaming, he gradually creates a fully formed man and sends him into the world, protected from fire.",
  fire: "When the dreamer himself walks into flames and is unharmed, he realizes that he too is the product of another person’s dream.",
  illusion: "The story explores illusion, creation, recursion, and the instability of reality.",
  reality: "THe realizes that he too is the product of another person’s dream."
};

const stage = document.querySelector(".stage");

const wordsLeft = document.getElementById("wordsLeft");
const wordsRight = document.getElementById("wordsRight");

const sentenceLeft = document.getElementById("sentenceLeft");
const sentenceRight = document.getElementById("sentenceRight");
const sentenceTextLeft = document.getElementById("sentenceTextLeft");
const sentenceTextRight = document.getElementById("sentenceTextRight");

const hoverWords = document.querySelectorAll(".wordHover");

function showSideSentence(side, key){
  const text = wordToSentence[key] || "";
  if(!text) return;

  if(side === "left"){

    wordsLeft.classList.add("hidden");
    sentenceTextLeft.textContent = text;
    sentenceLeft.classList.remove("hidden");
  } else {

    wordsRight.classList.add("hidden");
    sentenceTextRight.textContent = text;
    sentenceRight.classList.remove("hidden");
  }
}

function restoreBothSides(){
  wordsLeft.classList.remove("hidden");
  wordsRight.classList.remove("hidden");
  sentenceLeft.classList.add("hidden");
  sentenceRight.classList.add("hidden");
}

function whichSide(el){
  const r = el.getBoundingClientRect();
  const stageR = stage.getBoundingClientRect();
  const elCenterX = r.left + r.width / 2;
  const stageCenterX = stageR.left + stageR.width / 2;
  return elCenterX < stageCenterX ? "left" : "right";
}

hoverWords.forEach(el => {
  el.addEventListener("mouseenter", () => {
    const key = el.dataset.word;
    if(!key) return;

    const side = whichSide(el);

    if(side === "left"){

        showSideSentence("right", key);
      sentenceLeft.classList.add("hidden");
      wordsLeft.classList.remove("hidden");
    } else {
      showSideSentence("left", key);
      sentenceRight.classList.add("hidden");
      wordsRight.classList.remove("hidden");
    }
  });

  el.addEventListener("mouseleave", () => {
    restoreBothSides();
  });
});

stage.addEventListener("mouseleave", restoreBothSides);

const cursorLeft = document.getElementById("cursorLeft");
const cursorRight = document.getElementById("cursorRight");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  cursorLeft.style.left = `${x}px`;
  cursorLeft.style.top = `${y}px`;

  const mirrorX = window.innerWidth - x;
  cursorRight.style.left = `${mirrorX}px`;
  cursorRight.style.top = `${y}px`;
});

hoverWords.forEach(el => {
  el.addEventListener("click", (e) => {
    const key = el.dataset.word;
    if(!key) return;
    window.location.href = `article.html?word=${encodeURIComponent(key)}`;
  });
});