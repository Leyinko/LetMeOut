export const difficulty_settings = {
  EASY: {
    assistance: true,
    global: 20,
    errors: 10,
    alternative: 6,
    score: {
      loss: 2000,
      initial: 1500000,
      clicks: 100,
      repair: 2000,
      end: 50000,
      hidden: 100000,
    },
  },
  NORMAL: {
    assistance: false,
    global: 15,
    errors: 20,
    alternative: 4,
    score: {
      loss: 1500,
      initial: 1500000,
      clicks: 100,
      repair: 2000,
      end: 75000,
      hidden: 150000,
    },
  },
  HARD: {
    assistance: false,
    global: 10,
    errors: 30,
    alternative: 2,
    score: {
      loss: 1000,
      initial: 1500000,
      clicks: 50,
      repair: 1000,
      end: 100000,
      hidden: 300000,
    },
  },
};

export function pointerAssistanceHandler(collider, object) {
  collider.addEventListener('mouseover', (e) => {
    e.target.classList.contains('clickable') && (collider.style.cursor = 'help');
  });
}
