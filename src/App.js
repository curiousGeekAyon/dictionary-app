import React,{useState} from 'react';
import './App.css';

function App() {
  const[inp,setInp]=useState("");
  const[partsOFspeech,setPos]=useState("");
  const[pohnetic,setPhonetic]=useState("");
  const[meaning,setMeaning]=useState("");
  const[example,setExample]=useState("");
  const[soundURL,setSoundURL]=useState("");
  const[name,setName]=useState("");
  const[flag,setFlag]=useState(false);
//   const[url,setUrl]=useState("");
 function handelInput(e)
     {
        setInp(e.target.value);
     }
     function handelClick(){
        console.log(inp);
        let url=(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp}`);
        console.log(url);
        fetch(url).then((response)=>(
           response.json()
        )).then((data)=>{
            console.log(data);
            if(data.title)
              {
                setName(data.message);
                setPos("");
                // setName(inp);
                setPhonetic("");
                setMeaning("");
                setExample("");
                setSoundURL("");
                document.getElementById("Name").style.color='red';
                document.getElementById("soundButton").style.opacity=0;
              }
              else{
                document.getElementById("Name").style.color='black';
            setPos(data[0].meanings[0].partOfSpeech);
            setName(inp);
            setPhonetic(data[0].phonetic);
            setMeaning(data[0].meanings[0].definitions[0].definition);
            setExample(data[0].meanings[0].definitions[0].example);
            if(data[0].phonetics.length > 0&&data[0].phonetics[0].audio!=='')
              {
                setSoundURL(data[0].phonetics[0].audio);
                setFlag(true);
                document.getElementById("soundButton").style.opacity=1;
              }
            else{
                   setFlag(false);
                   document.getElementById("soundButton").style.opacity=0;
            }
            // console.log(data[0].phonetics[0].audio);
              }
        }).catch((err)=>{
                    console.log(err);
    });
    }
    function playSound(){
        if(flag)
           {
         const audioElement=document.getElementById('sound');
         audioElement.play();
           }
    }
//  function handelSound()
//      {
//        sound.setAttribute('src',setSoundURL);
//      }

  return (
    <div> 
    <div className="container">
        <div className="search-box">
            <input
                type="text"
                placeholder="Type the word here.."
                id="inp-word"
                value={inp} 
                onChange={handelInput}
            />
            <button id="search-btn" onClick={handelClick}>Search</button>
        </div>
        <div className="result" id="result">
        <div className="word">
                    <h3 id="Name">{name}</h3>
                    <button id="soundButton">
                        <i className="fas fa-volume-up" onClick={playSound}><audio id="sound" src={soundURL} ></audio></i>
                    </button>
                </div>
                <div className="details">
                    <p>{partsOFspeech}</p>
                    <p>{pohnetic}</p>
                </div>
                <p className="word-meaning">
                   {meaning}
                </p>
                <p className="word-example">
                   {example}
                </p>
        </div>
    </div>
</div>
  );
}

export default App;
