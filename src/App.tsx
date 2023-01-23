import { useEffect, useState } from 'react'
import './App.css'

interface Quote {
  _id: string
  quote: string
  author: string

}


function App() {

  useEffect(() => {
    const fetchQuote = async () => {
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
      console.log(await result.json()); 
      const data = await result.json() as Quote;
      setQuote(data)
    }
    fetchQuote()
  }, [])

 


  const [quote, setQuote] = useState<Quote | null>(null)

  return (
    <div className="App">
      
    </div>
  )
}

export default App
