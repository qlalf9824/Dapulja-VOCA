import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './Home'
import QuizSession from './QuizSession'
import WordList from './WordList'

const Header = {
  textDecoration: 'none',
  color: 'inherit'
}

function App() {
  return (
    <section style={{ textAlign: 'center' }}>
      <Link to='/' style={Header}>
        <h1>다풀자 영단어</h1>
      </Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='quiz' element={<QuizSession />} />
        <Route path='wordlist' element={<WordList />} />
      </Routes>
    </section>
  )
}

export default App
