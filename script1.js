document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language is used for web apps?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Tabular Markup Language",
        "None of these"
      ],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Microsoft", "Facebook", "Apple"],
      answer: "Facebook"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let userName = "";

  window.login = function () {
    const name = document.getElementById("nameInput").value.trim();
    const userId = document.getElementById("userIdInput").value.trim();

    if (!name || !userId) {
      alert("Please enter both name and user ID.");
      return;
    }

    userName = name;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";

    document.querySelector(".description").innerText = `Hi ${userName}, test your knowledge with a quick and fun quiz.`;
  };

  window.startQuiz = function () {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    showQuestion();
  };

  function showQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.classList.add("option-btn");
      btn.onclick = () => handleAnswerClick(btn, option === q.answer);
      optionsDiv.appendChild(btn);
    });
  }

  function handleAnswerClick(button, isCorrect) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
      quizData[currentQuestion].options.forEach((opt, i) => {
        if (opt === quizData[currentQuestion].answer) {
          allButtons[i].classList.add("correct");
        }
      });
    }

    document.getElementById("nextBtn").style.display = "inline-block";
  }

  window.nextQuestion = function () {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    const message = score < 2 ? "😔 Better luck next time!" : "🎉 Great job!";
    document.getElementById("score").innerHTML = `
      ${userName}, you scored <strong>${score}</strong> out of <strong>${quizData.length}</strong><br><br>
      <span class="result-message">${message}</span>
    `;
  }

  window.submitQuiz = function () {
    alert(`${userName}, your quiz has been submitted. Thank you!`);
    const submitBtn = document.querySelector("#resultPage button");
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitted";
  };
});
