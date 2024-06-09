function Progress({numQuestions,points,index,maxPoints,answer}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={(index + Number(answer !== null))}/>
            <p>Question {index+1} / {numQuestions}</p>
            <p>{points}/{maxPoints}</p>
        </header>
    )
}

export default Progress
