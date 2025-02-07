let question_field = document.querySelector('.question');
let answer_buttons = document.querySelectorAll('.answer');
let container_h3 = document.querySelector('.container_h3');
let container_main = document.querySelector(".main");
let container_start = document.querySelector(".start");
let start_button = document.querySelector(".start-btn");
let timer_display = document.createElement('div');
timer_display.classList.add('timer');
container_main.appendChild(timer_display);

let correct_answer_given = 0;
let total_answers_given = 0;
let level = 1;
let time_left = 30;
let timer_interval;

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

let sings = ['+', '-', '*', '/'];
function getRandomSigs() {
    return sings[randint(0, 3)];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Question {
    constructor() {
        let a = randint(1 * level, 30 * level);
        let b = randint(1 * level, 30 * level);
        let sign = getRandomSigs();
        this.question = `${a} ${sign} ${b}`;

        if (sign == '+') {
            this.correct = a + b;
        } else if (sign == '-') {
            this.correct = a - b;
        } else if (sign == '*') {
            this.correct = a * b;
        } else if (sign == '/') {
            this.correct = Math.round((a / b) * 100) / 100;
        }

        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15)
        ];
        shuffle(this.answers);
    }

    display() {
        anime({
            targets: question_field,
            opacity: [0, 1],
            duration: 500,
            easing: 'easeInOutQuad'
        });
        question_field.innerHTML = this.question;

        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i];
        }
    }
}

function startTimer() {
    time_left = 30;
    timer_display.innerHTML = `Час: ${time_left}s`;
    timer_interval = setInterval(() => {
        time_left--;
        timer_display.innerHTML = `Час: ${time_left}s`;
        if (time_left <= 0) {
            clearInterval(timer_interval);
            container_main.style.display = "none";
            container_start.style.display = 'flex';
            container_h3.innerHTML = `Ви дали ${correct_answer_given} правильних із ${total_answers_given}.<br>Точність - ${Math.round(correct_answer_given * 100 / total_answers_given)} %.`;
        }
    }, 1000);
}

start_button.addEventListener("click", function () {
    container_main.style.display = 'flex';
    container_start.style.display = 'none';
    correct_answer_given = 0;
    total_answers_given = 0;
    level = 1;
    startTimer();
    current_question = new Question();
    current_question.display();
});

for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function () {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            correct_answer_given += 1;
            answer_buttons[i].style.background = '#00FF00';
            if (correct_answer_given % 5 === 0) {
                level++;
            }
        } else {
            answer_buttons[i].style.background = '#FF0000';
        }

        anime({
            targets: answer_buttons[i],
            background: '#ffeb3b',
            duration: 500,
            delay: 100,
            easing: 'linear'
        });

        total_answers_given += 1;
        current_question = new Question();
        current_question.display();
    });
}
