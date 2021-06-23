/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which commonly misspelled word is correct?",
      o: ["Facsmellie", "Facsmile", "Facsimile", "Facsimilie"],
      a: 2,
    },
    {
      q: "Which of these countries is largest?",
      o: ["United Kingdom", "Italy", "Panama", "Nigeria"],
      a: 3,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0">
                    <input type="radio" name="radio${index}" id="radio_${index}_0"> 
                    ${quizItem.o[0]}
                    </li>

                    <li class="list-group-item" id="li_${index}_1">
                    <input type="radio" name="radio${index}" id="radio_${index}_1">
                    ${quizItem.o[1]}
                    </li>
                    
                    <li class="list-group-item"  id="li_${index}_2">
                    <input type="radio" name="radio${index}" id="radio_${index}_2"> 
                    ${quizItem.o[2]}
                    </li>
                    
                    <li class="list-group-item"  id="li_${index}_3">
                    <input type="radio" name="radio${index}" id="radio_${index}_3"> 
                    ${quizItem.o[3]}
                    </li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        const liElement = document.querySelector("#" + li);
        const radioElement = document.querySelector("#" + r);

        const rightAnswerIdx = quizItem.a;
        const radioElementIdx = i;

        //check if it is the right answer
        if (radioElementIdx === rightAnswerIdx) {
          liElement.style.backgroundColor = "green";

          // if the user clicked on the right answer, increment score
          if (radioElement.checked) {
            score++;
          }
        }
      }
    });
    return score;
  };

  // call the displayQuiz function
  displayQuiz();

  // Reset button reloads the page when clicked
  const reset = document.querySelector("#btnReset");
  reset.addEventListener("click", () => {
    window.location.reload();
  });

  // Function to calculate the score
  const submitQuiz = () => {
    const score = calculateScore();
    //and display it in the span element
    const spanEl = document.querySelector("#score");
    spanEl.innerHTML = `Your total score is ${score}`;
  };

  // Submit button calculates the score
  const submitBtn = document.querySelector("#btnSubmit");
  submitBtn.addEventListener("click", () => {
    submitQuiz();
  });

  //Countdown timer
  let counter;

  window.onload = () => {
    let sec = 60;
    counter = setInterval(() => {
      const timeElement = document.querySelector("#time");
      timeElement.innerHTML = `0 : ${sec}`;
      sec--;
      // when it gets to 0, it submits the quiz and displays the score and highlights the correct answers
      if (sec === 0) {
        submitQuiz();
      }
      // also clears the interval (so it does not go to -1 etc)
      if (sec < 0) {
        clearInterval(counter);
      }
    }, 1000);
  };
});
