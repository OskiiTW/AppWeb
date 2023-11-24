let matchedCardsCount = 0;
let timerInterval; 
let timerStarted = false; 
let timer = 0;

const images = [
    'gojorojo.jpg',
    'megumi.jpg',
    'meimei.jpg',
    'murasaki.jpg',
    'sukuna.jpg',
    'jjk.jpg',
    'jjk0.jpg',
    'nanami.jpg',
  ];

  const cardImages = images.concat(images);
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffle(cardImages);
  
  const gameContainer = document.querySelector('.memory-game');
  let selectedCards = [];
  let canFlip = true;
  
  function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    const imgElement = document.createElement('img');
    imgElement.src = 'images/' + image;
    card.appendChild(imgElement);
    card.addEventListener('click', () => flipCard(card));
    gameContainer.appendChild(card);
  }
  
  function flipCard(card) {
    if (!canFlip || card.classList.contains('matched') || selectedCards.length >= 2) {
      return;
    }
  
    card.classList.add('flipped');
    const imgElement = card.querySelector('img');
    imgElement.style.display = 'block';
  
    selectedCards.push({ card, imgElement });

    if (!timerStarted) {
        timerStarted = true;
        startTimer();
      }
  
    if (selectedCards.length === 2) {
      canFlip = false;
      setTimeout(checkMatch, 1000);
    }
  }
  
  function checkMatch() {
    const [card1, card2] = selectedCards;
  
    if (card1.imgElement.src === card2.imgElement.src) {
      card1.card.classList.add('matched');
      card2.card.classList.add('matched');

    matchedCardsCount++;
    updateScore();

    if (matchedCardsCount === cardImages.length / 2) {
      alert(`¡Felicidades has ganado!\nTiempo: ${timer} segundos`); 
        }
    } else {
        card1.card.classList.remove('flipped');
        card2.card.classList.remove('flipped');
        card1.imgElement.style.display = 'none';
        card2.imgElement.style.display = 'none';
    }
  
    selectedCards = [];
    canFlip = true;
  }

  function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = matchedCardsCount;
  }

  function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${timer}s`;
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      updateTimer();
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  cardImages.forEach(createCard);

  function resetGame() {
    stopTimer();
    timer = 0;
    updateTimer();
    timerStarted = false;
  
    matchedCardsCount = 0;
    updateScore();
  
    const flippedCards = document.querySelectorAll('.flipped');
    flippedCards.forEach((card) => {
      card.classList.remove('flipped');
      const imgElement = card.querySelector('img');
      imgElement.style.display = 'none';
    });
  
    canFlip = true;
    selectedCards = [];
  
    shuffle(cardImages);
    gameContainer.innerHTML = '';
    cardImages.forEach(createCard);
  }