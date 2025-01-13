import { useState } from 'react';
import './Guess.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Guess = () => {
  const [secretNumber, setSecretNumber] = useState(Math.trunc(Math.random() * 20) + 1);
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(0);
  const [message, setMessage] = useState('Start guessing...');
  const [guess, setGuess] = useState('');

  const displayMessage = (message) => setMessage(message);

  const handleCheck = () => {
    const guessNumber = Number(guess);

    if (!guessNumber) {
      displayMessage('⛔️ No number!');
    } else if (guessNumber === secretNumber) {
      displayMessage('🎉 Correct Number!');
      document.body.style.backgroundColor = '#60b347';

      if (score > highscore) {
        setHighscore(score);
      }
    } else if (guessNumber !== secretNumber) {
      if (score > 1) {
        displayMessage(guessNumber > secretNumber ? '📈 Too high!' : '📉 Too low!');
        setScore(score - 1);
      } else {
        displayMessage('💥 You lost the game!');
        setScore(0);
      }
    }
  };

  const handleAgain = () => {
    setScore(20);
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    setMessage('Start guessing...');
    setGuess('');
    document.body.style.backgroundColor = '#222';
  };

  return (
    <div className="guess-game container text-center py-5">
      <header className="mb-4">
        <h1 className="display-4">Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn btn-primary again" onClick={handleAgain}>Again!</button>
        <div className="number">?</div>
      </header>
      <main className="d-flex justify-content-around">
        <section className="left">
          <input
            type="number"
            className="form-control guess mb-3"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button className="btn btn-success check" onClick={handleCheck}>Check!</button>
        </section>
        <section className="right text-white">
          <p className="message">{message}</p>
          <p className="label-score">💯 Score: <span className="score">{score}</span></p>
          <p className="label-highscore">🥇 Highscore: <span className="highscore">{highscore}</span></p>
        </section>
      </main>
    </div>
  );
};

export default Guess;
