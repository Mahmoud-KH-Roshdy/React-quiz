import Options from "./Options"
import { useQuiz } from "./context/QuestionContext"

function Question() {
    const {questions,index} = useQuiz();
    const question = questions.at(index);
    return (
        <div className="question"> 
            <h4>{question.question}</h4>
            <Options question={question}/>
        </div>
    )
}

export default Question
