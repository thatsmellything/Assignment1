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


  //this should be called when the page first loads and acts very similarly to the fetchQuote function it is just a random quote instead
  async function randomQuote() {
    //console.log("fetch quote called")
      //this is the results of the actual fetch
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random")
      //save all json results to data, multiple authors and quotes will come saved in an array under results[]
      const data = await result.json();
      //create variable to hold the html to be returned
      var returnMe = "";
      //returns a single quote and author
      const quote = data as Quote;
      //this takes each quote and ite respective author and adds it to returnMe, which is basic html
      returnMe = returnMe + "<div id='singleQuote'>" + quote.content + "<br>" + quote.author + "<br></div><br> ";
      //return the basic html
      return returnMe;
  }

// take in the author to search for, output a bunch of the returned quotes in the form of mini div's with the quote and author
  async function fetchQuote(searchAuthor: string) {
    //console.log("fetch quote called")
      //this is the results of the actual fetch
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchAuthor)
      //save all json results to data, multiple authors and quotes will come saved in an array under results[]
      const data = await result.json();
      //create variable to hold the html to be returned
      var returnMe = "";
      //for each results in array found in the json, push to quotes array, this is because it sends back an array of quotes 
      //unlike the random quote which just sends one
      data.results.forEach((quote: Quote) => {
        //this takes each quote and its respective author and adds it to returnMe, which is basic html
        returnMe = returnMe + "<div id='singleQuote'>" + quote.content + "<br>" + quote.author + "<br></div><br> ";
      })
      //return the basic html
      return returnMe;
  }

 
 //this basically will run when the focument first loads or if the page is refreshed
  useEffect(() => {
    //when document first loads, run the randomQuote function
    randomQuote().then((data) => {
      //put the data into the div with id quotes
      document.getElementById("quotes")!.innerHTML = data;
      
    })
  }, [])



  return (
          
          <div id="everything">
            <h1>Quote Search</h1>
            <div>
              {/* text input for the author search */}
              <input type="text"
                placeholder="Author to search for"
                // straight up copied this from our notes thing so idk if its really even needed but it works sooooo
                value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
                <br></br>

                {/* button for actually doing the search */}
                <button onClick={() => {
                  //when button is clicked, the fetchQuote and put fetchQuote return data into the div with id quotes
                  fetchQuote(author).then((data) => {
                    //put the data into the div with id quotes
                    document.getElementById("quotes")!.innerHTML = data;
                    
                  })
                  
                }
                  }>Search</button>
              {/* div to hold the quotes */}
              <div id="quotes"></div>
            </div>
          </div>
  )
}

export default App
