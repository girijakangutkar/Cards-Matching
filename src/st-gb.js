import React, { useState, useEffect } from "react";
import "./App.css";
import { FaFrog } from "react-icons/fa";

const cardImages = [
  "🐶",
  "🐱",
  "🐭",
  "🐢",
  "🐸",
  "🐼",
  "🐶",
  "🐱",
  "🐭",
  "🐢",
  "🐸",
  "🐼",
];

const GAME_DURATION = 30;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [flips, setFlips] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    setCards(
      shuffleArray(
        cardImages.map((image, index) => ({
          id: index,
          image,
          isFlipped: false,
        }))
      )
    );
    setScore(0);
    setFlips(0);
    setFlippedIndices([]);
    setGameCompleted(false);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setGameStarted(false); // Reset game started state
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((time) => {
          if (time > 0 && !gameCompleted) {
            return time - 1;
          } else if (time === 0 && !gameCompleted) {
            setGameOver(true);
            return 0;
          }
          return time;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        setScore((score) => score + 1);
        if (score + 1 === cardImages.length / 2) {
          setGameCompleted(true);
        }
      } else {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedIndices([]);
    }
  }, [flippedIndices, cards, score]);

  const handleCardClick = (index) => {
    if (gameStarted && flippedIndices.length < 2 && !cards[index].isFlipped) {
      if (flippedIndices.length < 2 && !cards[index].isFlipped) {
        setCards((cards) =>
          cards.map((card, i) =>
            i === index ? { ...card, isFlipped: true } : card
          )
        );
        setFlippedIndices((indices) => [...indices, index]);
        setFlips((flips) => flips + 1);
      }
    }
  };
  // const handleCardClick = (index) => {
  //   if (flippedIndices.length < 2 && !cards[index].isFlipped) {
  //     setCards((cards) =>
  //       cards.map((card, i) =>
  //         i === index ? { ...card, isFlipped: true } : card
  //       )
  //     );
  //     setFlippedIndices((indices) => [...indices, index]);
  //     setFlips((flips) => flips + 1);
  //   }
  // };

  return (
    <div className="App">
      {!gameStarted ? (
        <h1>Tap to play!</h1>
      ) : (
        <h1>
          <FaFrog size={40} />
          Memory Marvel
        </h1>
      )}
      {!gameStarted ? (
        <h1>Tap to play!</h1> && <button id="srt" onClick={startGame}></button>
      ) : (
        <>
          {/* <h1>Memory Marvel</h1> */}
          <div className="stats">
            <div id="score">
              <div class="circle1"></div>Score: {score}
            </div>
            <div id="Flips">
              <div class="circle2"></div>Flips: {flips}
            </div>
            <div id="timer">
              <div class="circle3"></div>Time Left: {timeLeft}s
            </div>
          </div>
          <div className="card-grid">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`card ${card.isFlipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                {card.isFlipped ? card.image : ""}
              </div>
            ))}
          </div>
        </>
      )}
      {(gameCompleted || gameOver) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{gameCompleted ? "You're a champ!" : "Time's Up!"}</h2>
            <div id="win"></div>

            <div className="stats">
              <div id="score2">
                <div class="circle4"></div>
                <p id="res1">Score: {score}</p>
              </div>
              <div id="Flips2">
                <div class="circle5"></div>
                <p id="res2">Flips: {flips}</p>
              </div>
            </div>
            <button id="agn" onClick={initializeGame}></button>
          </div>
        </div>
      )}
    </div>
  );
}

//     </div>
//   );
// }

export default App;
