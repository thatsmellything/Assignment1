import { useState, useEffect } from 'react';

let ID_COUNT = 0;

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface Quote {
  _id: string
  quote: string
  author: string

}

function App() {
  const [author, setAuthor] = useState<string>("")


  function fetchQuote(searchAuthor: string) {
    fetch("https://usu-quotes-mimic.vercel.app/api/" + searchAuthor)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setQuote(data);
    })
  }

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
          <div>
            <h1>Random Quote</h1>
            <div>
              <input type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
                <button onClick={() => {
                  console.log(author);
                  console.log(fetchQuote(author));
                }
                  

                  }>Search</button>
                  
              
            </div>
            
            
            
          </div>
  )
}

export default App
