function getRandomColor(usedColors) {
  const letters = "0123456789ABCDEF";
  let color;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (usedColors.includes(color));
  usedColors.push(color);
  return color;
}

function getRandomTintColor(usedTintColors) {
  const letters = "0123456789ABCDEF";
  let tintColor;
  do {
    tintColor = "#";
    for (let i = 0; i < 6; i++) {
      tintColor += letters[Math.floor(Math.random() * 16)];
    }
  } while (usedTintColors.includes(tintColor));
  usedTintColors.push(tintColor);
  return tintColor;
}

const usedColors = [];
const usedTintColors = [];
export const TEST_DATA = [
  {
    icon: require("../../../assets/imgs/man.png"),
    txt: "Personal",
    screen: "PROFILE",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/notification.png"),
    txt: "Notification",
    screen: "Notifications",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/training.png"),
    txt: "Subject Class",
    screen: "CLASS SUBJECT",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/presentation.png"),
    txt: "Homeroom",
    screen: "CLASS SUBJECT",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/feedback.png"),
    txt: "Feedback",
    screen: "Feedback",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/scoreboard.png"),
    txt: "Score",
    screen: "SCORE",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
  {
    icon: require("../../../assets/imgs/bubble-chat.png"),
    txt: "Chat GPT",
    screen: "CHAT GPT",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },

  {
    icon: require("../../../assets/imgs/spell.png"),
    txt: "Prediction",
    screen: "Prediction",
    color: getRandomColor(usedColors),
    tintColor: getRandomTintColor(usedTintColors),
  },
];

export const AUTO_TEST_DATA = [
  { icon: require("../../data/img/animal1.png"), txt: 1 },
  { icon: require("../../data/img/animal2.png"), txt: 2 },
  { icon: require("../../data/img/animal3.png"), txt: 3 },
  { icon: require("../../data/img/animal4.png"), txt: 4 },
  { icon: require("../../data/img/animal5.png"), txt: 5 },
  { icon: require("../../data/img/animal6.png"), txt: 6 },
  { icon: require("../../data/img/animal7.png"), txt: 7 },
  { icon: require("../../data/img/animal8.png"), txt: 8 },
  { icon: require("../../data/img/animal9.png"), txt: 9 },
  { icon: require("../../data/img/animal10.png"), txt: 10 },
  { icon: require("../../data/img/animal11.png"), txt: 11 },
  { icon: require("../../data/img/animal12.png"), txt: 12 },
  { icon: require("../../data/img/animal13.png"), txt: 13 },
  { icon: require("../../data/img/animal14.png"), txt: 14 },
  { icon: require("../../data/img/animal15.png"), txt: 15 },
  { icon: require("../../data/img/animal16.png"), txt: 16 },
  { icon: require("../../data/img/animal17.png"), txt: 17 },
  { icon: require("../../data/img/animal18.png"), txt: 18 },
  { icon: require("../../data/img/animal1.png"), txt: 19 },
  { icon: require("../../data/img/animal2.png"), txt: 20 },
  { icon: require("../../data/img/animal3.png"), txt: 21 },
  { icon: require("../../data/img/animal4.png"), txt: 22 },
  { icon: require("../../data/img/animal5.png"), txt: 23 },
  { icon: require("../../data/img/animal6.png"), txt: 24 },
  { icon: require("../../data/img/animal7.png"), txt: 25 },
  { icon: require("../../data/img/animal8.png"), txt: 26 },
];

export const TXT =
  "Never give up, Never lose hope. \n" +
  "\n" +
  "Always have faith, It allows you to cope. \n" +
  "\n" +
  "Trying times will pass, As they always do. \n" +
  "\n" +
  "Just have patience, Your dreams will come true. \n" +
  "\n" +
  "So put on a smile, You'll live through your pain. \n" +
  "\n" +
  "Know it will pass, And strength you will gain.";
