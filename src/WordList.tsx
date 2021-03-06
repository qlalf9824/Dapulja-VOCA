import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { initialData } from './data/initialData'

const tableStyle = {
  margin: '0 auto',
  marginTop: '20px',
  marginBottom: '20px',
  width: '400px',
  height: '350px'
}

const thStyle = {
  backgroundColor: '#d8e2dc'
}

interface Word {
  text: string
  meaning: string
}

function WordView(word: Word) {
  return (
    <tr key={word.text}>
      <th style={thStyle}>{word.text}</th>
      <td>{word.meaning}</td>
    </tr>
  )
}

function WordList() {
  const linkStyle = {
    display: 'block',
    padding: '8px'
  }

  // TODO
  // 훅을 이용해서, 화면이 로드되면 아래 주소에서 단어를 들고와서 화면에 표시
  // 아래 샘플 단어를 대체해야 함.
  // https://solution-tmp.s3.ap-northeast-2.amazonaws.com/vocabs.json
  // warning!
  // 만약 어떠한 이유로 작동이 되지 않는다면, 그 문제를 우회해서
  // 전체 기능이 동작하도록 코드를 구현.

  const [words, setWords] = useState<Word[]>(initialData)

  const getPosts = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        'https://solution-tmp.s3.ap-northeast-2.amazonaws.com/vocabs.json'
      )
      setWords(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPosts()
  }, [words])

  return (
    <section>
      <table style={tableStyle}>{words.map((word) => WordView(word))}</table>
      <Link to='/' style={linkStyle}>
        홈으로
      </Link>
    </section>
  )
}

export default WordList
