import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote {
  _id: string
  quote: string
  author: string

}

useEffect(() => {
  const fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    setQuote(data)
  }
  fetchQuote()



}, [])



function App() {
  const [quote, setQuote] = useState<Quote | null>(null)

  return (
    <div className="App">
      
    </div>
  )
}

export default App
