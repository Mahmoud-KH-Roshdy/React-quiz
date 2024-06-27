import { useQuiz } from "./context/QuestionContext"

function Progress() {
    const {numQuestions,points,index,maxPoints,answer} = useQuiz()
    return (
        <header className="progress">
            <progress max={numQuestions} value={(index + Number(answer !== null))}/>
            <p>Question {index+1} / {numQuestions}</p>
            <p>{points}/{maxPoints}</p>
        </header>
    )
}

export default Progress
