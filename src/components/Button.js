function Button({dispatch , answer,index,numQuestions} ) {
    if(answer === null) return ;
    if(index < numQuestions - 1  ) return (<button className="btn btn-ui" onClick={ ()=>dispatch({type:"newQuestion"}) } >Next </button>)
    if (index === numQuestions - 1) return (<button className="btn btn-ui" onClick={ ()=>dispatch({type:"finish"}) } >Finish </button>)
    
}

export default Button
