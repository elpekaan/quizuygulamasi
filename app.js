function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

// Question prototype
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}


var q1 = new Question("Tarihte kurulan ilk Türk devleti hangisidir?",["Göktürk Devleti","Uygur Devleti","Bati Hun İmparatorluğu","Osmanli Devleti "],"Bati Hun İmparatorluğu");

var q2 = new Question("Hangisi Oscar ödülü almiş bir yapimdir?",["Amour","Avengers","Batman","Passengers"],"Amour");

var q3 = new Question("Italyancadan Türkçeye geçen (Tavla) kelimesinin kökeninin anlami nedir?",["Şans","Pul","Tahta","Zar"],"Tahta");

var q4 = new Question("Hangi çift 2017'de doğan kizlarinin adini Mevlana Celaleddin-i Rumi'den esinlenerek Rumi koymuştur?",["Meghan Markle ve Prens Harry","Kim Kardasian ve Kanye West","Beyonce ve Jay-Z","Victoria ve David Beckham"],"Beyonce ve Jay-Z");

var q5 = new Question("Hangisi TDK sözlüklerinde yer alan bir kelime değildir?",["Varsiz","Patirtisiz","Yoksuz","Sirasiz"],"Varsiz");

var questions = [q1,q2,q3,q4,q5];


// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();


function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{

        var question = quiz.getQuestion();
        var choices = question.choices;
        
        document.querySelector('#question').textContent = question.text;

        for(var i=0; i<choices.length;i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }

        showProgress();
    }
}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion()
    }
}

function showScore(){
   var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

   document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    var html = 'Question '+ questionNumber + ' of ' + totalQuestion;

    if(totalQuestion === questionNumber){
        document.querySelector('#progress').innerHTML = "Quiz is Ended";
    }else{
        document.querySelector('#progress').innerHTML = html;
    }

  
}