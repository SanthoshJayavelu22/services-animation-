document.addEventListener("DOMContentLoaded", () => {
  const totalSteps = 9;
  let currentStep = 1;
  let isAutomatic = true;

  const interval = setInterval(() => {
    const step = currentStep;

    updateUI(step, isAutomatic);

    currentStep++;

    if (currentStep > totalSteps) {
      clearInterval(interval);
      setTimeout(() => {
        resetToNormalState();
      }, 1000);
    }
  }, 1000);
});


const activationImage = {
    1: { stages: [1] },
    2: { stages: [5] },
    3: { stages: [5, 2] },
    4: { stages: [2, 6] },
    5: { stages: [2, 5, 6] },
    6: { stages: [2, 3, 5, 6] },
    7: { stages: [2, 3, 5, 6, 7] },
    8: { stages: [4, 8] },
    9: { stages: [1, 2, 3, 4, 5, 6, 7, 8] },
  };
  
  const activationRound = {
    1: { stages: [1] },
    2: { stages: [2] },
    3: { stages: [2, 3] },
    4: { stages: [3, 4] },
    5: { stages: [2, 3, 4] },
    6: { stages: [2, 3, 4, 5] },
    7: { stages: [2, 3, 4, 5, 6] },
    8: { stages: [7, 8] },
    9: { stages: [1, 2, 3, 4, 5, 6, 7, 8] },
  };

function updateUI(step, isAutomatic) {
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    progressFill.style.width = `${(step / 8) * 100}%`;
  }

  const stages = document.querySelectorAll(".stage");
  stages.forEach((stage, index) => {
    if (activationRound[step]?.stages.includes(index + 1)) {
      stage.classList.add("active");
    } else {
      stage.classList.remove("active");
    }
  });

  const images = document.querySelectorAll(
    ".top-images img, .bottom-images img"
  );
  images.forEach((img, index) => {
    if (activationImage[step]?.stages.includes(index + 1)) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  if (!isAutomatic) {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    const button = document.querySelector(
      `.buttons button[data-step="${step}"]`
    );
    if (button) {
      button.classList.add("active");
    }
  }
}



function resetToNormalState() {
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    progressFill.style.width = "0%";
  }

  const stages = document.querySelectorAll(".stage");
  stages.forEach((stage) => {
    stage.classList.remove("active");
  });

  const images = document.querySelectorAll(
    ".top-images img, .bottom-images img"
  );
  images.forEach((img) => {
    img.classList.remove("active");
  });

  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
}

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.getAttribute("data-step"));

    updateUI(step, false);
  });
});


