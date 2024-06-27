import { useQuiz } from "./context/QuestionContext"

function StartScreen() {
    const {numQuestions,dispatch} = useQuiz()
    return (
        <section className="start">
            <h2>Welcome to react quiz!</h2>
            <h3> {numQuestions} questions to test your skills in react </h3>
            <button className="btn btn-ui" onClick={() => dispatch({type:"start"})}>Let's Start</button>
        </section>
    )
}

export default StartScreen
