import { useEffect, useRef, useState } from "react";
import Spinner from "./components/Spinner";
import Quiz from "./components/Quiz";

function App() {
  //number --- Keep track of question number
  const [number, setNumber] = useState(0);
  //questions --- data fetched from api
  const [questions, setQuestions] = useState([]);
  //showError --- used to show error if error occur during fetching data
  const [showError, setShowError] = useState(false);
  //selectedOption --- keep track of option that user selected
  const [selectedOption, setSelectedOption] = useState(null);
  //score --- keep track of score
  const [score, setScore] = useState(0);
  //gameOver --- to keep track of game state
  const [gameOver, setGameOver] = useState(false);
  //rand --- used to put correct_answer in random position in options 
  let rand = useRef(Math.floor(Math.random() * 4));
  //fetchData --- async function to fetch data from api
  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
      if (!response.ok) {
        throw Error;
      }
      const data = await response.json();
      setQuestions(data.results);
    } catch (e) {
      setShowError(true);
    }
  }
  //randomOptions --- function to suffle positions of options
  const randomOptions = () => {
    const options = questions[number].incorrect_answers.map(element => formatData(element));
    options.splice(rand.current, 0, formatData(questions[number].correct_answer));
    return options;
  }
  //formatData --- function to correct string of questions and options fetched from api
  const formatData = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.innerHTML;
  }
  //onSelectedOption --- execute when user click on one of the option
  const onSelectOption = (option) => {
    if (option === questions[number].correct_answer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
  }
  const handleNextClick = () => {
    if (number >= questions.length-1) {
      setGameOver(true);
      return;
    }
    rand.current = Math.floor(Math.random() * 4);
    setSelectedOption(null);
    setNumber(number + 1);
  }
  const handlePlayAgainClick = () => {
    setGameOver(false);
    setNumber(0);
    setQuestions([]);
    setSelectedOption(null);
    setScore(0);
    showError(false);
    rand.current = Math.floor(Math.random() * 4);
  }
  //fetch data when game starts or when use clicks play again
  useEffect(() => {
    if (!gameOver) {
      fetchData();
    }
  }, [gameOver]);
  return (
    <div className={`container-fluid min-vh-100 py-5 bg-${selectedOption ? (selectedOption === questions[number].correct_answer ? 'success' : 'danger') : 'primary'}`}>
      <div className="w-75 w-sm-50 mx-auto p-4 rounded text-light" style={{ background: '#0F2167' }}>
        <h1>Programming Quiz</h1>
        <hr className="text-light" />
        {
          gameOver
            ?
            <h4>Congrats! You Scored {score} out of 10</h4>
            :
            (questions.length
              ?
              <Quiz question={formatData(questions[number].question)} number={number} options={randomOptions()} onSelectOption={onSelectOption} selectedOption={selectedOption} correct={formatData(questions[number].correct_answer)} />
              :
              <Spinner showError={showError} />)
        }
        {
          selectedOption
          &&
          <div className="text-center">
            <button className="btn btn-light mt-2 px-4" onClick={gameOver ? handlePlayAgainClick : handleNextClick}>{gameOver ? 'Play Again' : 'Next'}</button>
          </div>
        }
      </div>
    </div>
  )
}
export default App;
