import QuizSessionResult from './QuizSessionResult'
import { State, Quiz } from './QuizSessionType'
// View
function QuizSessionView(state: State, onClick: (selected: string) => void) {
  function QuizView(quiz: Quiz) {
    const articleStyle = {
      marginTop: '16px',
      padding: '8px',
      background: '#efefef'
    }
    return (
      <article style={articleStyle}>
        <header>{quiz.text}</header>
        {quiz.selections.map((sel, idx) => {
          return (
            <button key={idx} onClick={() => onClick(sel)}>
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
      <div>완료 여부: {state.isCompleted ? '완료' : '미완료'}</div>
      <div>맞은 개수 {state.correctCount}</div>
      <div>틀린 개수 {state.inCorrectCount}</div>
      {state.isCompleted ? QuizSessionResult(state) : QuizView(currentQuiz)}
    </section>
  )
}

export default QuizSessionView
