import Option from "./Option";
function Quiz({ question, number, options, onSelectOption, selectedOption,correct }) {
    
    return (
        <>
            <h3>{number + 1}. {question}</h3>
            {
                options.map((element,index) => <Option key={index} onSelectOption={onSelectOption} selectedOption={selectedOption} correct={correct}>{element}</Option>)
            }
        </>
    )
}
export default Quiz;