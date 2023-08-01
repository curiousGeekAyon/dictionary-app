import React, { useState } from "react";
import "./App.css";

function App() {
  const [inp, setInp] = useState("");
  const [soundURL, setSoundURL] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [dictionayD, setDicD] = useState({});

  function handelInput(e) {
    setInp(e.target.value);
  }
  function handelClick() {
    console.log(inp);
    if (inp !== "") {
      let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inp}`;
      // console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.title) {
            setDicD(data);
            setName(data.message);
            // setPos("");
            // // setName(inp);
            // setPhonetic("");
            // setMeaning("");
            // setExample("");
            // setSoundURL("");
            document.getElementById("Name").style.color = "red";
            document.getElementById("soundButton").style.opacity = 0;
          } else {
            setDicD(data[0]);
            document.getElementById("Name").style.color = "black";
            setName(inp);
            if (
              dictionayD?.phonetics.length > 0 &&
              dictionayD?.phonetics[0].audio !== ""
            ) {
              setSoundURL(dictionayD?.phonetics[0].audio);
              setFlag(true);
              document.getElementById("soundButton").style.opacity = 1;
            } else {
              setFlag(false);
              document.getElementById("soundButton").style.opacity = 0;
            }
            // console.log(data[0].phonetics[0].audio);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function playSound() {
    if (flag) {
      const audioElement = document.getElementById("sound");
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
        
        {Object.keys(dictionayD).length>0&&dictionayD?.meanings[0]?.definitions[0]?.definition ? (
          <div className="result" id="result">
            <div className="word">
              <h3 id="Name">{name}</h3>
              <button id="soundButton">
                <i className="fas fa-volume-up" onClick={playSound}>
                  <audio id="sound" src={soundURL}></audio>
                </i>
              </button>
            </div>
            <div className="details">
              <p>{dictionayD?.meanings[0]?.partOfSpeech}</p>
              <p>{dictionayD?.phonetic}</p>
            </div>
            <p className="word-meaning">
              {dictionayD?.meanings[0].definitions[0].definition}
            </p>
            <p className="word-example">
              {dictionayD?.meanings[0].definitions[0].example}
            </p>
          </div>
        ) : (
          <div className="result" id="result">
            <div className="word">
              <h3 id="Name">{name}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
