// console.log("this is js");

let startbtn = document.querySelector('.start-btn');
let infobox = document.querySelector('.info-box');
let exit = infobox.querySelector('.exit');
let next = infobox.querySelector('.next');
let quizbox = document.querySelector('.quiz-box');
let options = document.querySelector('.options');
let timeCount = quizbox.querySelector('.time-sec');
let timeline = quizbox.querySelector('.time-line');
let timeoff = quizbox.querySelector('.time-text');



// if Start quiz button clicked
startbtn.onclick = () => {
    // console.log("click hor ha h");
    infobox.classList.add("activeInfo");
};

// if Exit button clicked
exit.onclick = () => {
    infobox.classList.remove("activeInfo");
}

// if continue button clicked
next.onclick = () => {
    infobox.classList.remove("activeInfo");
    quizbox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerline(0);
}

let questionCount = 0;
let questionNum = 1;
let counter;
let counterLine;
let timeValue = 15;
let startTimeValue = 0;
let scoreCount = 0;

let nextbtn = quizbox.querySelector('.next-btn');
let resultbox = document.querySelector(".result-box");
let restart = resultbox.querySelector(".restart");
let quit = resultbox.querySelector(".quit");


restart.onclick = () => {
    quizbox.classList.add("activeQuiz");
    resultbox.classList.remove("activeResult");
    questionCount = 0;
    questionNum = 1;
    timeValue = 15;
    startTimeValue = 0;
    scoreCount = 0;
    showQuestions(questionCount);
    queCounter(questionNum);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerline(startTimeValue);
    nextbtn.style.display = "none";
    timesoff.textContent = "Time-Left";

}
quit.onclick = () => {
    location.reload()
}

// if next button clicked
nextbtn.onclick = () => {
    // console.log("next btn pr click ho gya")
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNum++
        showQuestions(questionCount);
        queCounter(questionNum);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerline(startTimeValue);
        nextbtn.style.display = "none";
        timesoff.textContent = "Time-Left";

    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        // console.log("Sare questions complete ho gye");
        showResultBox();
    }
}



// getting questions and options from the array
function showQuestions(index) {
    let questionsQue = document.querySelector('.questions');
    let questionTag = '<span>' + questions[index].number + "." + questions[index].question + '</span>';
    let optionTag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>'
    questionsQue.innerHTML = questionTag;
    options.innerHTML = optionTag;
    let option = options.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


let tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fa fa-times"></i></div>'

// getting the right answer
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let alloptions = options.children.length;

    if (userAnswer == correctAnswer) {
        +answer.classList.add('correct');
        // console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        scoreCount++;
        // console.log(scoreCount);
    } else {
        answer.classList.add('incorrect');
        // console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // if answer is incorrect then automatically selected the correct answer
        for (let i = 0; i < alloptions; i++) {
            if (options.children[i].textContent == correctAnswer) {
                options.children[i].setAttribute("class", "option correct");
                options.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // once user selected disabled all option
    for (let i = 0; i < alloptions; i++) {
        options.children[i].classList.add("disabled");
    }
    nextbtn.style.display = "block";
}

// 



// // getting question number
function queCounter(index) {
    let totalques = quizbox.querySelector(".total-ques");
    let totalQuesTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>'
    totalques.innerHTML = totalQuesTag;
}


// for start timer
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timesoff.textContent = "Time-off";


            let correctAnswer = questions[questionCount].answer;
            let alloptions = options.children.length;


            for (let i = 0; i < alloptions; i++) {
                if (options.children[i].textContent == correctAnswer) {
                    options.children[i].setAttribute("class", "option correct");
                    options.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < alloptions; i++) {
                options.children[i].classList.add("disabled");
            }
            nextbtn.style.display = "block";
        }
    }
}


// for time line start
function startTimerline(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
            nextbtn.style.display = "block";
        }
    }

}



// getting result

function showResultBox() {
    infobox.classList.remove("activeInfo");
    quizbox.classList.remove("activeQuiz");
    resultbox.classList.add("activeResult");
    let scoreText = resultbox.querySelector(".score-text");
    if (scoreCount > 3) {
        let scoreTag = '<span>and congrats! You got only <p>' + scoreCount + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (scoreCount > 1) {
        let scoreTag = '<span>and nice, You got only <p>' + scoreCount + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>and sorry, You got only <p>' + scoreCount + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}