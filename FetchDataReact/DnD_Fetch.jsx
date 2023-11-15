function App() {
  const { useState, useEffect } = React;
  const { Badge , Button } = ReactBootstrap;
  const [url, setUrl] = useState("https://api.open5e.com/v1/classes/?search=");
  const [query, setQuery] = useState('')
  const [pcClass, setPcClass] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [displayed, setDisplayed] = useState();

  /*name: 'Barbarian', hitDice: '1d12', description: '### Rage \n \nIn battle, you fight with primal feroc…se by 4. Your maximum for those scores is now 24.', archetypes:[]*/

  // const [text, setText] = useState();

  console.log("Rendering App");

  useEffect(() => {
    console.log("Fetching...");
    const fetchData = async () => {
      const answer = await axios(url);
      console.log('Moving Drawers...')
      console.log(answer.data)
      console.log(answer.data.results)

      // setText(answer.data.results[3].name)
      // setRawData(answer.data.results)
      
      let tempArr = answer.data.results.map( e => ({ 
        name: e.name, 
        hitDice: e.hit_dice, 
        description: e.desc, 
        archetypes: e.archetypes,
        index: answer.data.results.indexOf(e)
      }))
      setPcClass([
        ...tempArr
      ])
      console.log('Fetched & Categorized')
      setDisplayed(pcClass[0])   
      setFetched(true)  
    };
    fetchData();
  }, [url]);
  
  fetched ? console.log(pcClass) : console.log('...') 
  return (
    <div className="wrapper">
      <div className="left-image"></div>
      <div className="center-text">
        <div>

          <h1>Character Class Information  </h1>

          <div>
            {pcClass.map((item) => 
            <Button key={item.index} id={item.index} variant="dark" className="button"
            onClick={event => {setDisplayed(pcClass[event.target.id]); event.preventDefault(); console.log(displayed.name);
            }}> 
              {item.name} ({item.hitDice})
            </Button>)}
          </div>
                    
          <form
            onSubmit={event => {
              setUrl(`https://api.open5e.com/v1/classes/?search=${query}`);
              event.preventDefault();
            }}
          >
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <Button type="submit" variant="outline-light"><b>Search Classes</b></Button>
          </form>


          { fetched && <h1>{'Chosen Class:'}</h1> }
          { displayed !== undefined ? 
          <div>        
            <h1> <Button href={`https://www.dndbeyond.com/classes/${displayed.name}`} bg="light" variant="outline-danger" text="dark" 
              title='open class on D&D Beyond' className='beyond'> <img width={60} src="./LoboGuara_d20_Logo-Hex.png" alt="Logo" /></Button>
              {' '}{displayed.name}  <Badge pill  bg="light" text="dark"> {displayed.hitDice} </Badge></h1>
            <ul> <h4>Archetypes:</h4> {displayed.archetypes.map(e => <li key={e.slug}>{e.name}</li>)}</ul>
            <p className="new-line"> {displayed.description.replaceAll('###','\n')}</p> 
          </div> 
          : fetched &&
          <div>        
            <h1> <Button href={`https://www.dndbeyond.com/classes/${pcClass[0].name}`} bg="light" variant="outline-danger" text="dark" 
              title='open class on D&D Beyond' className='beyond'> <img width={60} src="./LoboGuara_d20_Logo-Hex.png" alt="Logo" /></Button>
              {' '}{pcClass[0].name} <Badge pill  bg="light" text="dark"> {pcClass[0].hitDice} </Badge></h1>
            <ul> <h4>Archetypes:</h4> {pcClass[0].archetypes.map(e => <li key={e.slug}>{e.name}</li>)}</ul>
            <p className="new-line"> {pcClass[0].description.replaceAll('###','\n')}</p> 
          </div> }
        </div>
      
      {/*onClick={ handleClickArch( e.name, e )} id={e.name} */}

      {/*consider finding a way to switch # with bold text.*/}
          <footer>
            <h3>Shoutouts</h3>
            <p><i>Left Background Photo by <a href="https://unsplash.com/@galxrax?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">galxrax rax</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-dice-on-a-table-oGAf4jsC0Fw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
            <br />
            Right Background Photo by <a href="https://unsplash.com/@gingermias?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">S L</a> on <a href="https://unsplash.com/photos/a-group-of-gold-dices-sitting-on-top-of-a-table-UM6vbyYfyJ0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></i>
            Logo Photo by <a href="https://www.freeimages.com/license">FreeImages</a>

            </p>
            <h3>Disclaimer</h3>
            <i><p>For me as a developer this website is an experiment to hone my skills, if you use it to search for information to use feel free to do so with all unofficial content, as per any official content present, this website is meant to be used as an easy reference with a search engine for books and folios you already own. You can also acquire them at <a href="https://www.dndbeyond.com/">D&D Beyond</a> 
            <br /> <br />
            The content above is not in anyway an official website, it is either unofficial Fan Content permitted under the Fan Content Policy or a public service from the API at <a href="https://api.open5e.com/">Open 5e</a>. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
            <br /> <br />
            As per Wizard's <a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>, please do not sell or license any information from here.</p></i>
          </footer> 
      </div>
      <div className="right-image"></div>
    </div>

    // <Container>
    //   <input
    //     type="text"
    //     value={text}
    //     onChange={event => setText(event.target.value)}
    //   />
    //   <button
    //     type="button"
    //     onClick={() => setUrl("http://localhost:5500/data.json")}
    //   >
    //     Search
    //   </button>

    //   <ul>
    //     {data.hits.map(item => (
    //       <li key={item.objectID}>
    //         <a href={item.url}>{item.title}</a>
    //       </li>
    //     ))}
    //   </ul>
    // </Container>
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

