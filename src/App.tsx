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


  async function fetchQuote(searchAuthor: string) {
    //console.log("fetch quote called")
      //this is the results of the actual fetch
      const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchAuthor)
      //save all json results to data, multiple authors and quotes will come saved in an array under results[]
      const data = await result.json();
      //create variable to hold the html to be returned
      var returnMe = "";
      //for each results in array found in the json, push to quotes array
      data.results.forEach((quote: Quote) => {
        //this takes each quote and ite respective author and adds it to returnMe, which is basic html
        returnMe = returnMe + "<div id='singleQuote'>" + quote.content + "<br>" + quote.author + "<br></div><br> ";
      })
      //return the basic html
      return returnMe;
  }

  function setBgColorById(id: string,sColor: string) {
    var elem;
    //for each element in the document, if the id matches the id passed in, set the background color to the color passed in
    document.querySelectorAll("#singleQuote").forEach((elem) => {
      elem.style.backgroundColor = sColor;
      elem.style.border = "1px solid black";
      //elem.style.border-radius = "5px";
    })
   }


 
  useEffect(() => {
    //when document first loads, run the randomQuote function
    randomQuote().then((data) => {
      //put the data into the div with id quotes
      document.getElementById("quotes")!.innerHTML = data;
      setBgColorById("singleQuote", "gray");
    })
  }, [])

    //loadingIn();
  
  

  




  return (
          
          <div id="everything">
            <h1>Quote Search</h1>
            <div>
              {/* text input for the author search */}
              <input type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}/>
                <br></br>

                {/* button for actually doing the search */}
                <button onClick={() => {
                  //when button is clicked, the fetchQuote and put fetchQuote return data into the div with id quotes
                  fetchQuote(author).then((data) => {
                    //put the data into the div with id quotes
                    document.getElementById("quotes")!.innerHTML = data;
                    setBgColorById("singleQuote", "gray");
                  })
                  
                }
                  }>Search</button>              
              <div id="quotes"></div>
            </div>
          </div>
  )
}

export default App
