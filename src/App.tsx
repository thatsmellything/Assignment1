import { useState, useEffect } from 'react';


interface Quote {
  _id: string
  author: string
  authorSlug: string
  content: string
  length: number
  

}

function App() {
  const [author, setAuthor] = useState<string>("")
  const [quotes, setQuotes] = useState<Quote[]>([])


  
  async function randomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random")
    
      
      //save all json results to data, multiple authors and quotes will come saved in an array under results[]
      const data = await result.json();

      var returnMe = "";

      //for each results in array found in the json, push to quotes array
      data.results.forEach((quote: Quote) => {
        //quotes.push is not a function
        //setQuotes(quotes => [...quotes, quote])
        //console.log(quote)

        returnMe = returnMe + "<div>" + quote.content + "<br>" + quote.author + "<br><br></div> ";
        
      })
      //console.log(returnMe)
      
      return returnMe;

  }



  async function fetchQuote(searchAuthor: string) {
    //console.log("fetch quote called")
    
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchAuthor)
      
      //save all json results to data, multiple authors and quotes will come saved in an array under results[]
      const data = await result.json();

      var returnMe = "";

      //for each results in array found in the json, push to quotes array
      data.results.forEach((quote: Quote) => {
        //quotes.push is not a function
        //setQuotes(quotes => [...quotes, quote])
        //console.log(quote)

        returnMe = returnMe + "<div>" + quote.content + "<br>" + quote.author + "<br><br></div> ";
        
      })
      //console.log(returnMe)
      
      return returnMe;
  }




  return (
          
          <div id="everything">
            <h1>Random Quote</h1>
            <div>
              <input type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
                <br></br>
                <button onClick={() => {
                  //console.log(author);
                  //fetchQuote(author).then((data) => {
                    //console.log(data)
                    //setQuotes(data)
                    //console.log("quotes")
                    //console.log(quotes)
                  //})
                  fetchQuote(author).then((data) => {
                    //console.log(data)
                    document.getElementById("quotes")!.innerHTML = data;
                  })
                  
                }
                  

                  }>Search</button>
                
                {/* when document first loads, run the randomQuote function */}

              <div id="startup" onLoad={() => {
                  console.log("startup")
                  randomQuote().then((data) => {
                    console.log(data)
                    document.getElementById("quotes")!.innerHTML = data;
                  })
                }
              }>
              </div>





              <div id="quotes">
              </div>
                  
                  
              
            </div>

            
            
            
            
          </div>
  )
}

export default App
