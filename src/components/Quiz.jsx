import { useRef, useState } from "react";
import Option from "./Option";

function Quiz({ ques, incorrect, correct, quesNo, changeBg, onNext, onPlayAgain, gameOver, onGameOver, stopCounter }) {
    const [score, setScore] = useState(0);
    const [select, setSelect] = useState(null);
    const randNo = useRef(Math.floor(Math.random() * 4));
    const options = randomOptions(incorrect, correct, randNo.current);
    const handleOptionClick = (value) => {
        setScore(value === correct ? score + 1 : score);
        changeBg(value === correct ? 'success' : 'danger');
        setSelect(value);
        stopCounter();
    }
    const handleNextClick = () => {
        changeBg('primary');
        setSelect(null);
        randNo.current = Math.floor(Math.random() * 4);
        if (quesNo === 10) {
            onGameOver(true);
        } else {
            onNext();
        }
    }
    const handlePlayAgainClick = () => {
        onPlayAgain();
        setScore(0);
    }
    return (
        <>
            <h3>
                {
                    gameOver
                        ?
                        `You Scored ${score} Out Of 10!`
                        :
                        `${quesNo}. ${formatData(ques)}`
                }
            </h3>
            {
                !gameOver
                &&
                options.map((e, i) => <Option
                    key={i}
                    value={e}
                    isCorrect={select && correct === e ? true : false}
                    onSelect={handleOptionClick}
                    select={select} />)
            }
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3">
                <p className="fs-5">{quesNo} of 10 Questions</p>
                {
                    (select || gameOver)
                    &&
                    <button className="btn btn-primary" onClick={gameOver ? handlePlayAgainClick : handleNextClick}>{gameOver ? 'Play Again' : 'Next'}</button>
                }
            </div>
        </>
    )
}
export default Quiz;

const formatData = (data) => {
    const p = document.createElement('p');
    p.innerHTML = data;
    return p.innerHTML;
}
const randomOptions = (incorrect, correct, randNo) => {
    const options = incorrect.slice();
    options.splice(randNo, 0, correct);
    return options.map(element => formatData(element));
}