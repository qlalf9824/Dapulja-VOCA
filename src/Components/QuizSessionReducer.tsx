import { State, QuizResult, Select } from './QuizSessionType'

type Action = Select

function QuizSessionReducer(state: State, action: Action) {
  // TODO
  // 선택한 선지에 따라
  // state 값이 변경되어야 함.
  // 예를 들어, 퀴즈 결과가 생성되고
  // 맞은 혹은 틀린 개수가 업데이트 되고,
  // 다음 퀴즈로 넘어가야 함.
  const newState = { ...state }
  let isCorrect: boolean

  if (action.payload.selected === state.quizList[action.payload.quizIndex].answer) {
    newState.correctCount += 1
    isCorrect = true
  } else {
    newState.inCorrectCount += 1
    isCorrect = false
  }

  if (action.payload.quizIndex === state.quizList.length - 1) newState.isCompleted = true
  else newState.currentIndex += 1

  const result: QuizResult = {
    quizIndex: action.payload.quizIndex,
    createdAt: new Date(),
    answer: state.quizList[action.payload.quizIndex].answer,
    selected: action.payload.selected,
    isCorrect: isCorrect
  }

  newState.quizResults.push(result)

  return newState
}

export default QuizSessionReducer
