import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  return (
    <div id='space'>
      <Link to='/wordlist' id='menu'>
        단어 목록 보기
      </Link>
      <Link to='/quiz' id='menu'>
        퀴즈 보기
      </Link>
    </div>
  )
}

export default Home
