import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
const initialState = {
  questions: [],
  status: "loading",
  index:0,
  answer:null,
  points: 0,
  highscore:0,
  secondsRemaining:null,
}
const SECS_PER_QUESTION = 20
function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready"
      };
    case "dataFailed": return { ...state, status: "error" };
    case "start": return {
      ...state, 
      status: "active",
      secondsRemaining: state.questions.length *  SECS_PER_QUESTION,
    };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === question.correctOption
            ? state.points + question.points
            : state.points,
      };
      case"newQuestion":return {...state, index:state.index++,answer:null};
      case"finish":return {
        ...state, 
      status:"finish",
      highscore:
      state.points > state.highscore ? state.points : state.highscore,
    };
      case"reset":return{...initialState, questions:state.questions ,status:"ready"};
      case"tick": return{
        ...state,
        secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining === 0 ? "finish" : state.status,
      }
    default: throw new Error("error in fetch data");
  }
}
function App() {
  const [{questions,status,index,answer,points,highscore,secondsRemaining}, dispatch] = useReducer(reduce, initialState);
  const numQuestions = questions.length ;
  const maxPoints = questions.reduce((prev,next) => prev + next.points,0)
  useEffect(function () {
    async function handleFectchQuestions() {
      try {
        const fectchQuestions = await fetch("https://questionsdata.onrender.com/questions");
        if (!fectchQuestions.ok) throw new Error("Something with wrong with fetch data");
        const data = await fectchQuestions.json();
        dispatch({ type: "dataReceived", payLoad: data })
      }
      catch (err) {
        console.error(err.message);
        dispatch({ type: "dataFailed" })
      }
    }
    handleFectchQuestions()
  }, [])
  return (
    <section className="app">
      <Header />
      <Main>
        {status ==="loading" && <Loader/>}
        {status ==="error" && <Error/>}
        {status ==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>} 
        {status ==="active" && 
        <>
        <Progress index={index} points={points} numQuestions={numQuestions} maxPoints={maxPoints} answer={answer}/>
        <Question question={questions[index]} answer={answer} dispatch={dispatch}/>
        <Footer>
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
        <Button answer={answer} dispatch={dispatch} numQuestions={numQuestions} index={index}/>
        </Footer>
        </>
        } 
        {status === "finish" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </section>
  );
}

export default App;
