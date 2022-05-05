import { State } from './QuizSessionType'
import { Link } from 'react-router-dom'

const tableStyle = {
  margin: '0 auto',
  marginTop: '10px',
  marginBottom: '10px'
}

function QuizSessionResult(state: State) {
  return (
    <section>
      <table style={tableStyle}>
        <thead>
          <th></th>
          <th>정답</th>
          <th>선택한 답</th>
          <th>정답여부</th>
        </thead>
        <tbody>
          {state.quizResults.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.answer}</td>
                <td>{value.selected}</td>
                <td>{value.isCorrect ? 'O' : 'X'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to='/'>홈으로</Link>
    </section>
  )
}

export default QuizSessionResult
