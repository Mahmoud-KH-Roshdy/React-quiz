import { useQuiz } from "./context/QuestionContext";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
function App() {
  const { status } = useQuiz();
  return (
    <Container>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <Button />
            </Footer>
          </>
        }
        {status === "finish" && <FinishScreen />}
      </Main>
    </Container>
  );
}

export default App;
