const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const PlayAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageEl = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part')
const words = ['programming','interface','function','application']

let selectedWord = words[Math.floor(Math.random() * words.length)]

let playable = true
const currentLetter = [];
const wrongLetter = [];

//Show hidden word
function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">${currentLetter.includes(letter) ? letter : ''}</span>
                `
            )
            .join('')
        }
    `
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        finalMessageEl.innerText = '';
        popup.style.display = 'flex';

        playable = false;
    }
}

//Update the wrong letters
function updateWrongLetter(){
    wrongLetterEl.innerHTML = `
        ${wrongLetter.length > 0 ? `<p>Wrong</p>` : ''}
        ${wrongLetter.map(letter => `<span>${letter}</span>`)}
    `
    figureParts.forEach((part, index) => {
        const errors = wrongLetter.length;

        if(index < errors) {
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none'
        }
    })

    if(wrongLetter.length === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageEl.innerText = `...the word has: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show')

    setTimeout(function(){
        notification.classList.remove('show')
    }, 3000)
}

//Events main
window.addEventListener('keydown', e => {
    if(playable){
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toLowerCase();

            if(selectedWord.includes(letter)){
                if(!currentLetter.includes(letter)){
                    currentLetter.push(letter);

                    displayWord()
                }
                else{
                    showNotification()
                }
            }
            else{
                if(!wrongLetter.includes(letter)){
                    wrongLetter.push(letter);

                    updateWrongLetter()
                }
                else{
                    showNotification()
                }
            }
        }
    }
})

//Event PlayAgainBtn

PlayAgainBtn.onclick = () =>{
    playable = true

    currentLetter.splice(0)
    wrongLetter.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]

    displayWord()

    updateWrongLetter()

    popup.style.display = 'none'
}

displayWord()

