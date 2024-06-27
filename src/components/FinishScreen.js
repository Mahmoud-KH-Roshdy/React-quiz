import { useQuiz } from "./context/QuestionContext";

function FinishScreen() {
    const { points, maxPoints, highscore,dispatch } = useQuiz()
    const percentage = (points / maxPoints) * 100;
    return (
        <>
            <p className="result">
                You scored {points} out of {maxPoints}( {Math.ceil(percentage)}% )
            </p>
            <p className="highscore">
                ( HighScore:{highscore}points)
            </p>
            <button className="btn btn-ui" onClick={()=> dispatch({type:"reset"})}>
                Reset 
            </button>
        </>
    );
}

export default FinishScreen;
