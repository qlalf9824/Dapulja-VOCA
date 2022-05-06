import QuizSessionResult from './QuizSessionResult'
import { State, Quiz } from './QuizSessionType'
import './quizSessionView.css'
// View
function QuizSessionView(state: State, onClick: (selected: string) => void) {
  function QuizView(quiz: Quiz) {
    const articleStyle = {
      marginTop: '16px',
      padding: '8px',
      background: '#fae1dd',
      paddingBottom: '50px'
    }

    const headerStyle = {
      fontSize: '50px',
      marginBottom: '20px',
      marginTop: '30px'
    }

    return (
      <article style={articleStyle}>
        <header style={headerStyle}>{quiz.text}</header>
        {quiz.selections.map((sel, idx) => {
          return (
            <button id='buttonStyle' key={idx} onClick={() => onClick(sel)}>
              {sel}
            </button>
          )
        })}
      </article>
    )
  }

  const currentQuiz = state.quizList[state.currentIndex]

  return (
    <section>
      <div>완료 여부: {state.isCompleted ? <span id='complete'>완료</span> : '미완료'}</div>
      <div>맞은 개수 {state.correctCount}</div>
      <div>틀린 개수 {state.inCorrectCount}</div>
      {state.isCompleted ? QuizSessionResult(state) : QuizView(currentQuiz)}
    </section>
  )
}

export default QuizSessionView
