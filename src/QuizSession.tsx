import { useEffect, useState } from 'react'
import { State, Quiz } from './Components/QuizSessionType'
import QuizSessionReducer from './Components/QuizSessionReducer'
import QuizSessionView from './Components/QuizSessionView'
import { initialData } from './data/initialData'

function QuizSession() {
  const [initalLoaded, setInitalLoaded] = useState(false)
  const [state, setState] = useState<State | null>(null)

  const initState: () => Promise<State> = async () => {
    // 임시로 1초간 타임 아웃.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO
    // initialData를 State 타입으로 변경 후 리턴한다.
    // quizList[].selections 을 만드는 조건은
    // 해당 단어의 뜻 하나와 다른 단어의 뜻 둘을 포함하여
    // 3지 선다형 뜻 찾기 문제 보기로 변환한다.
    // 아래 데이터는 예시 데이터이므로 삭제.

    function shuffle(array: Array<String>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    const createQuizList = () => {
      let result: Quiz[] = []

      for (let i = 0; i < initialData.length; i++) {
        let random_1: number = Math.floor(Math.random() * initialData.length)

        while (i === random_1) {
          random_1 = Math.floor(Math.random() * initialData.length)
        }

        let random_2: number = Math.floor(Math.random() * initialData.length)

        while (random_2 === random_1 || i === random_2) {
          random_2 = Math.floor(Math.random() * initialData.length)
        }

        const selectList = [
          initialData[i].meaning,
          initialData[random_1].meaning,
          initialData[random_2].meaning
        ]
        shuffle(selectList)

        result.push({
          index: i,
          text: initialData[i].text, // 문제
          answer: initialData[i].meaning, // 정답
          selections: selectList
        })
      }

      return result
    }

    return {
      isCompleted: false,
      correctCount: 0,
      inCorrectCount: 0,
      currentIndex: 0,
      quizList: createQuizList(),
      quizResults: []
    }
  }

  useEffect(() => {
    ;(async () => {
      // 초기 데이터 불러오기
      if (!initalLoaded) {
        const initalState = await initState()
        setState(initalState)
        setInitalLoaded(true)
      }
    })()
  }, [initalLoaded])

  const quizSelected = (selected: string) => {
    if (state == null) return

    const newState = QuizSessionReducer(state, {
      type: 'SELECT',
      payload: {
        quizIndex: state.currentIndex,
        selected: selected
      }
    })
    setState(newState)
  }

  return <div>{state ? QuizSessionView(state, quizSelected) : '로딩중...'}</div>
}

export default QuizSession
