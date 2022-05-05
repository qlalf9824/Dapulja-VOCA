import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// State
type Quiz = {
  index: number
  text: string // 문제
  answer: string // 정답
  selections: string[] // 보기 목록 (정답 포함), 2지 선다
}

type QuizResult = {
  quizIndex: number
  createdAt: Date
  answer: string // 정답
  selected: string // 선택한 답
  isCorrect: boolean // 정답여부
}

type State = {
  isCompleted: boolean // computed
  correctCount: number // computed
  inCorrectCount: number // computed
  currentIndex: number // computed
  quizList: Quiz[]
  quizResults: QuizResult[]
}

// Action

// Select 동작방식
// 선지를 선택하면, 새로운 퀴즈결과가 생기고,
// 다음 문제로 넘어가야 한다.
type Select = {
  type: 'SELECT'
  payload: {
    quizIndex: number
    selected: string
  }
}

type Action = Select

function quizSessionReducer(state: State, action: Action) {
  // TODO
  // 선택한 선지에 따라
  // state 값이 변경되어야 함.
  // 예를 들어, 퀴즈 결과가 생성되고
  // 맞은 혹은 틀린 개수가 업데이트 되고,
  // 다음 퀴즈로 넘어가야 함.
  const newState = { ...state }
  return newState
}

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
      {state.isCompleted ? <Link to='/'>홈으로</Link> : QuizView(currentQuiz)}
    </section>
  )
}

function QuizSession() {
  const [initalLoaded, setInitalLoaded] = useState(false)
  const [state, setState] = useState<State | null>(null)

  const initState: () => Promise<State> = async () => {
    // 임시로 1초간 타임 아웃.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const initialData = [
      {
        text: 'apple',
        meaning: 'a. 사과'
      },
      {
        text: 'brick',
        meaning: 'n. 벽돌'
      },
      {
        text: 'completion',
        meaning: 'n. 완성, 성취'
      },
      {
        text: 'obstacle',
        meaning: 'n. 장애물'
      },
      {
        text: 'horn',
        meaning: 'n. 뿔, 경적'
      },
      {
        text: 'dough',
        meaning: 'n. 밀가루 반죽'
      },
      {
        text: 'leap',
        meaning: 'v. 뛰다, 급증하다.'
      },
      {
        text: 'pearl',
        meaning: 'n. 진주, 진주색'
      },
      {
        text: 'tourism',
        meaning: 'n. 관광, 관광 사업'
      },
      {
        text: 'persisent',
        meaning: 'a. 지속적인, 끈질긴'
      }
    ]
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
        const random_1: number = Math.floor(Math.random() * initialData.length)
        let random_2: number = Math.floor(Math.random() * initialData.length)

        while (random_2 == random_1) {
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

    const newState = quizSessionReducer(state, {
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
