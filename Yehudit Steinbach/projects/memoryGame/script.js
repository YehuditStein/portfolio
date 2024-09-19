const imagesType1 = [
    'images/animals/img1.jpg',
    'images/animals/img2.jpg',
    'images/animals/img3.jpg',
    'images/animals/img4.jpg',
    'images/animals/img5.jpg',
    'images/animals/img6.jpg',
    'images/animals/img7.jpg',
    'images/animals/img8.jpg'
];

const imagesType2 = [
    'images/landscape/img1.jpg',
    'images/landscape/img2.jpg',
    'images/landscape/img3.jpg',
    'images/landscape/img4.jpg',
    'images/landscape/img5.jpg',
    'images/landscape/img6.jpg',
    'images/landscape/img7.jpg',
    'images/landscape/img8.jpg'
];

// Default settings
let difficulty = 'easy';
let cardType = 'type1';
const difficultySettings = {
    easy: { rows: 2, cols: 3 },
    medium: { rows: 3, cols: 4 },
    hard: { rows: 4, cols: 4 }
};

const container = document.querySelector('.game-container');
const difficultyButtons = document.querySelectorAll('.difficulty-button');
const cardTypeButtons = document.querySelectorAll('.card-type-button');
const resetButton = document.querySelector('.reset-button');
let flippedCards = [];
let matchedPairs = 0;

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.card = image;

    const img = document.createElement('img');
    img.src = image;
    img.alt = 'Card Image';
    card.appendChild(img);

    card.addEventListener('click', flipCard);

    return card;
}

function initializeGame() {
    // Clear previous game if exists
    container.innerHTML = '';

    // Reset variables for a new game
    flippedCards = [];
    matchedPairs = 0;

    const { rows, cols } = difficultySettings[difficulty];
    const numCards = rows * cols;

    // Choose the images based on the selected card type
    const images = cardType === 'type1' ? imagesType1 : imagesType2;
    const imagePairs = [...images.slice(0, numCards / 2), ...images.slice(0, numCards / 2)];
    imagePairs.sort(() => 0.5 - Math.random());

    // Create cards and append to the container
    imagePairs.forEach(image => {
        const card = createCard(image);
        container.appendChild(card);
    });

    // Set grid layout based on difficulty
    container.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(this)) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        matchedPairs++;
        if (matchedPairs === (container.childElementCount / 2)) {
            // הצגת הודעת ניצחון למשך 3 שניות
            const victoryMessage = document.getElementById('victoryMessage');
            victoryMessage.style.display = 'block';

            // הסתרת ההודעה אחרי 3 שניות
            setTimeout(() => {
                victoryMessage.style.display = 'none';
            }, 3000);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Event listeners for difficulty buttons
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficulty = button.dataset.difficulty;
        initializeGame();
    });
});

// Event listeners for card type buttons
cardTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        cardType = button.dataset.type;
        initializeGame();
    });
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
    document.getElementById('victoryMessage').style.display = 'none'; // הסתרת הודעת הניצחון בעת איפוס
    initializeGame(); // מאפס את המשחק
});

// Initialize the game with default settings
initializeGame();