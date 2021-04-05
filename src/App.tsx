import React from 'react'
import QuestionCard from './components/QuestionCard'
import { app_load_anim } from './assets/animations'

function App() {

  React.useEffect(()=> {
    app_load_anim()
  }, [])

  return (
    <>
      <h1>Quiz App</h1>
      <QuestionCard />
      <footer>
        <a className="portfolio-link" href="https://portfolio.j8ahmed.com">Built by Jamal J8</a>
      </footer>
    </>
  );
}

export default App;
