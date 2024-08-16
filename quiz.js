const quizData = {
    "quiz": [
        {
            "question": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Paris", "Rome"],
            "correct_answer": ["Paris"]
        },
        {
            "question": "Which of the following are programming languages?",
            "options": ["Python", "HTML", "CSS", "JavaScript"],
            "correct_answer": ["Python", "JavaScript"]
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "options": ["Earth", "Mars", "Jupiter", "Saturn"],
            "correct_answer": ["Mars"]
        },
        {
            "question": "What is the largest mammal in the world?",
            "options": ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
            "correct_answer": ["Blue Whale"]
        },
        {
            "question": "Who wrote 'Romeo and Juliet'?",
            "options": ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
            "correct_answer": ["William Shakespeare"]
        },
        {
            "question": "Which element has the chemical symbol 'O'?",
            "options": ["Oxygen", "Gold", "Osmium", "Oganesson"],
            "correct_answer": ["Oxygen"]
        },
        {
            "question": "What is the smallest unit of life?",
            "options": ["Atom", "Molecule", "Cell", "Organ"],
            "correct_answer": ["Cell"]
        },
        {
            "question": "Which country won the FIFA World Cup in 2018?",
            "options": ["Germany", "Brazil", "Argentina", "France"],
            "correct_answer": ["France"]
        },
        {
            "question": "What is the speed of light?",
            "options": ["300,000 km/s", "150,000 km/s", "1,000 km/s", "500,000 km/s"],
            "correct_answer": ["300,000 km/s"]
        },
        {
            "question": "Who painted the Mona Lisa?",
            "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            "correct_answer": ["Leonardo da Vinci"]
        }
    ]
};


let currentQuiz = 0;
let score = 0;
let answers = [];

function loadQuiz() {
    const quizElement = document.getElementById('quiz');
    quizElement.innerHTML = '';

    quizData.quiz.forEach((q, index) => {
        const quizQuestion = document.createElement('div');
        quizQuestion.classList.add('quiz-question');

        const question = document.createElement('p');
        question.innerText = `${index + 1}. ${q.question}`;
        quizQuestion.appendChild(question);

        q.options.forEach((option, optIndex) => {
            const optionElement = document.createElement('div');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `q${index}_o${optIndex}`;
            input.name = `q${index}`;
            input.value = option;

            const label = document.createElement('label');
            label.htmlFor = `q${index}_o${optIndex}`;
            label.innerText = option;

            optionElement.appendChild(input);
            optionElement.appendChild(label);
            quizQuestion.appendChild(optionElement);
        });

        quizElement.appendChild(quizQuestion);
    });
}

function submitQuiz() {
    const quizElements = document.querySelectorAll('.quiz-question');
    quizElements.forEach((quizElement, index) => {
        const selectedOptions = [];
        const inputs = quizElement.querySelectorAll('input[name="q' + index + '"]:checked');
        inputs.forEach(input => {
            selectedOptions.push(input.value);
        });
        answers.push({ question: quizData.quiz[index].question, selectedOptions });
    });

    reviewAnswers();
}

function reviewAnswers() {
    document.getElementById('review').classList.remove('hidden');
    const reviewAnswersElement = document.getElementById('review-answers');
    reviewAnswersElement.innerHTML = '';

    answers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        const question = document.createElement('p');
        question.innerText = `${index + 1}. ${answer.question}`;
        reviewItem.appendChild(question);

        const selected = document.createElement('p');
        selected.innerText = `Your Answer: ${answer.selectedOptions.join(', ')}`;
        reviewItem.appendChild(selected);

        const correct = document.createElement('p');
        correct.innerText = `Correct Answer: ${quizData.quiz[index].correct_answer.join(', ')}`;
        correct.style.color = 'green';
        reviewItem.appendChild(correct);

        reviewAnswersElement.appendChild(reviewItem);
    });
}

function showResult() {
    answers.forEach((answer, index) => {
        if (JSON.stringify(answer.selectedOptions) === JSON.stringify(quizData.quiz[index].correct_answer)) {
            score++;
        }
    });

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').innerText = `You scored ${score} out of ${quizData.quiz.length}`;
}

document.getElementById('submit').addEventListener('click', submitQuiz);
document.getElementById('show-result').addEventListener('click', showResult);

loadQuiz();
