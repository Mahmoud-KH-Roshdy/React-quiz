import { useQuiz } from "./context/QuestionContext";

function Options({question}) {
    const {dispatch, answer } = useQuiz()
    const isAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((option,index) => (
                <button 
                className={`btn btn-option ${index === answer ? "answer" :""}  
                ${ isAnswered ? index === question.correctOption ? "correct" : "wrong" :""}`}
                key={option} 
                onClick={() => dispatch({type:"newAnswer",payLoad:index})}
                disabled={isAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
