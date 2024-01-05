import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/Quiz';
import { useEffect, useRef, useState } from 'react';
import Spinner from './components/Spinner';

function App() {
  const api = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
  const [quiz, setQuiz] = useState(null);
  const [number, setNumber] = useState(0);
  const [counter, setCounter] = useState(10);
  const [bg, setBg] = useState('primary');
  const [error, setError] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef(null);
  const animationTimerId = useRef(null);
  const counterTimerId = useRef(null);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        setError('Something went wrong! Try Later');
        return;
      }
      const data = await response.json();
      setQuiz(data.results);
      setError(null);
      counterTimer();
    } catch (e) {
      setError('Poor Internet Connection!');
    }
  }

  const shake = () => {
    containerRef.current.classList.add('shake');
    if (animationTimerId.current) {
      clearTimeout(animationTimerId.current);
    }
    animationTimerId.current = setTimeout(() => {
      containerRef.current.classList.remove('shake');
    }, 1000);
  }

  const changeBg = (value) => {
    setBg(value);
    if (value === 'danger') {
      shake();
    }
  }

  const handlePlayAgain = () => {
    setQuiz(null);
    setNumber(0);
    setGameOver(false);
    setCounter(10);
    fetchQuiz();
  }

  const counterTimer = () => {
    if (counterTimerId.current) {
      clearInterval(counterTimerId.current);
    }
    counterTimerId.current = setInterval(() => {
      setCounter((counter) => {
        if (counter <= 0) {
          clearInterval(counterTimerId.current);
          return 0;
        } else {
          return counter - 1;
        }
      });
    }, 1000);
  }

  const handleNextClick = () => {
    setNumber(number + 1);
    setCounter(10);
    counterTimer();
  }
  if (counter === 0 && !gameOver) {
    setGameOver(true);
  }

  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <div className={`min-vh-100 pt-5 bg-${bg}`}>
      <div ref={containerRef} className='bg-white col-10 col-md-6 mx-auto rounded p-3 text-primary'>
        <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
          <h2 className='order-2 order-sm-0 mt-2 mt-sm-none'>Programming Quiz</h2>
          <div className='timer d-flex align-items-center fs-5 gap-3 rounded p-1 border bg-primary text-light'>
            Time left
            <div className={`px-2 py-1 bg-dark text-${counter < 4 ? 'danger' : 'light'} rounded`}>{(counter < 10 && counter > 0) ? '0' + counter : counter}</div>
          </div>
        </div>
        <hr />
        {
          quiz
            ?
            <Quiz ques={quiz[number].question} incorrect={quiz[number].incorrect_answers} correct={quiz[number].correct_answer} quesNo={number + 1} changeBg={changeBg} onNext={handleNextClick} onPlayAgain={handlePlayAgain} gameOver={gameOver} onGameOver={() => setGameOver(true)} stopCounter={() => clearInterval(counterTimerId.current)} />
            :
            <Spinner error={error} />
        }
      </div>
    </div>
  )
}
export default App;