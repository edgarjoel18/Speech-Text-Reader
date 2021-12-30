const main = document.querySelector("main");
const voicesSelected = document.getElementById("voices");
const toggleButton = document.getElementById("toggle-button");
const textArea = document.getElementById("text");
const readButton = document.getElementById("read-button");
const closeButton = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

function createBox(item) {
  const boxDiv = document.createElement("div");
  boxDiv.classList.add("box");
  const { image, text } = item;
  boxDiv.innerHTML = `
  <img src="${image}"/>
  <p class="info">${text}</p>
  `;
  // add an event listener to each box so it can translate it
  boxDiv.addEventListener("click", () => {
    // set the text we want to speak
    setText(text);
    // then we want to speak that text
    speakText();
    // set the active looks for a temporary moment
    boxDiv.classList.add("active");
    setTimeout(() => {
      boxDiv.classList.remove("active");
    }, 800);
  });
  main.appendChild(boxDiv);
}

const message = new SpeechSynthesisUtterance();

// store the voices
let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const optionElement = document.createElement("option");
    optionElement.value = voice.name;
    optionElement.innerText = `${voice.name} ${voice.lang}`;
    voicesSelected.appendChild(optionElement);
  });
}
//voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

function setText(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoiceChange(event) {
  message.voice = voices.find((voice) => voice.name === event.target.value);
}

function setTextFromTextArea() {
  setText(textArea.value);
  speakText();
}

// watch for the different voices being changed in the text box
voicesSelected.addEventListener("change", setVoiceChange);
// watch for the sentences being entered in the text area
readButton.addEventListener("click", setTextFromTextArea);

// open the text box
toggleButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

// close the text box
closeButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});
getVoices();
