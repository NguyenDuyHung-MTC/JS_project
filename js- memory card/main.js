const clear = document.getElementById('clear');
const show = document.getElementById('show');
const cardsContainer = document.getElementById('cards-container');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
const addContainer = document.getElementById('add-container');
const hide = document.getElementById('hide');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addCard = document.getElementById('add-card');
// Vi tri hien tai
let currentIndex = 0;
//Luu tru the DOM
const cardsEl =[]
//Luu tru the hien tai
const cardNew = getCards();
/* const cardsNew = [
    {
        question: 'Nguyen Duy Hung',
        answer: 'dep trai'
    },
    {
        question: 'Nguyen Ngoc Son',
        answer: 'anh trai Nguyen Duy Hung'
    },
    {
        question: 'Classroom of the elite',
        answer: 'The end'
    }
] */

// Tao tat ca cac card

function createCards(){
    cardNew.forEach((data,index) => {
        createCard(data,index)
    });
}

// Tao 1 card trong DOM
function createCard(data,index){
    const card = document.createElement('div')
    card.classList.add('card')
    card.id = `card-${index}`

    if(index == 0){
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front" id="inner-card-front-${index}">
            <span style="text-align:center; display: none; font-size: 17px;">Answer: D-Vietnamese</span>
            <p>${data.questionEl}</p>
            <div>
                <input type="text" id="text-${index}" class="text">
                <input type="submit" id="submit-${index}" onclick="check(${index})" class="submit">
                <span id="warning-${index}" class="warning"></span>
            </div>
        </div>
        <div class="inner-card-back">
            <p id="textId-${index}">
              ${data.answerEl}
            </p>
        </div>
    </div>
    `

    card.addEventListener('click', ()=>card.classList.toggle('show-answer'))

    cardsEl.push(card)
    cardsContainer.appendChild(card)

    checkElevent(index)
    updateCurrentText()
    stop(index)
}

function checkElevent(id){
    if(id >= 12){
        const innerCard = document.getElementById('inner-card-front-'+id)
        const span = innerCard.querySelector('span')

        span.style.display = 'block'
    }
}

function check(id){
    const warning = document.getElementById('warning-'+ id)
    const innerCard = document.getElementById('inner-card-front-'+id)
    const text = document.getElementById('text-'+ id)
    const textInnerCB = document.getElementById('textId-'+id)
    const cardId = document.getElementById('card-'+id)
    let playable = false

    if(text.value === ''){
        innerCard.style.borderWidth = ''
        innerCard.style.borderColor = ''
        innerCard.style.borderStyle = ''
        warning.style.display = 'block'
        warning.style.color = '#000'
        warning.style.fontWeight = 'bold'
        warning.innerText = 'Please enter full text'
    }
    else if(text.value.trim().toLowerCase() === textInnerCB.innerText.trim().toLowerCase()){
        innerCard.style.borderWidth = '2px'
        innerCard.style.borderColor = '#31df31'
        innerCard.style.borderStyle = 'solid'
        warning.style.display = 'block'
        warning.style.color = '#31df31'
        warning.style.fontWeight = 'bold'
        warning.innerText = 'Exactly'
    }
    else{
        innerCard.style.borderWidth = '2px'
        innerCard.style.borderColor = 'red'
        innerCard.style.borderStyle = 'solid'
        warning.style.display = 'block'
        warning.style.color = 'red'
        warning.style.fontWeight = 'bold'
        warning.innerText = 'Sorry, Again!!!'
    }
}

function stop(id){
    const submit = document.getElementById('submit-'+ id)
    const text = document.getElementById('text-'+ id)

    text.addEventListener('click', (e)=>{
        e.stopPropagation()
    })

    submit.addEventListener('click',(e)=>{
        e.stopPropagation()
    })
}
// so trang
function updateCurrentText(){
    current.innerText = `${currentIndex + 1}/ ${cardsEl.length}`
}
// Nhan the tu local storages
function getCards(){
    const cards = JSON.parse(localStorage.getItem('card'));
    return cards === null ? [] : cards
}
// gui the den local storage
function setCards(cards){
    localStorage.setItem('card', JSON.stringify(cards))
    window.location.reload()
}

createCards()
// cau tiep theo
next.addEventListener('click',()=>{
    cardsEl[currentIndex].className = 'card left';

    currentIndex = currentIndex + 1;
    if(currentIndex > cardsEl.length-1){
        currentIndex = cardsEl.length-1
    }

    cardsEl[currentIndex].className = 'card active';
    updateCurrentText()
})
// lui cau
prev.addEventListener('click', ()=>{
    cardsEl[currentIndex].className = 'card right';

    currentIndex = currentIndex - 1;
    if(currentIndex < 0){
        currentIndex = 0
    }

    cardsEl[currentIndex].className = 'card active';
    updateCurrentText()
})
//Show addContainer
show.addEventListener('click',()=>addContainer.classList.add('show'));
//Hide addContainer
hide.addEventListener('click',()=>addContainer.classList.remove('show'));
//Add new card
addCard.addEventListener('click', ()=>{
    const questionEl = question.value
    const answerEl = answer.value;
    
    if(questionEl.trim() && answerEl.trim()){
        const newCard = {questionEl, answerEl}

        createCard(newCard)

        question.value = ''
        answer.value = ''

        addContainer.classList.remove('show')
        
        cardNew.push(newCard)
        setCards(cardNew)
    }
})
// Xoa tat ca
clear.addEventListener('click', ()=>{
    localStorage.removeItem('card')
    cardsContainer.innerHTML = ''
    window.location.reload()
})