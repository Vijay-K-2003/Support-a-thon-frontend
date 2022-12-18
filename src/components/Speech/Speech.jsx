import { useState, useEffect } from "react";
import "./Speech.scss";
import { useAuthContext } from "../../context/AuthProvider";
import micIcon from "../../assets/mic_icon.png";
import axios from 'axios';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function Timer(props) {
  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}

const Speech = (props) => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("lorem ipsum like um he hello I meant Instagram and Linkedin and Twitter tiktok");
  const [savedNotes, setSavedNotes] = useState([]);
  const [time, setTime] = useState(0);
  const {auth, qId} = useAuthContext();
  const {setDetails} = props;

  useEffect(() => {
    handleListen();
  }, [isListening]);

  useEffect(() => {
    let interval = null;

    if (isListening) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleStartStop = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
    }
  };

  const handleSaveNote = () => {
    // https://e9b8-2405-201-2010-5080-714f-def4-fb26-d729.in.ngrok.io/api/getDetails
    getDetails();
    setSavedNotes((prevNotes) => [...prevNotes, note]);
    setNote("");
    setTime(0);
  };

  const getDetails = async () => {
    const data = await axios.post( "https://e9b8-2405-201-2010-5080-714f-def4-fb26-d729.in.ngrok.io/api/getDetails", {
      "key": "73627",
      "questionID": qId,
      "email": "vijay@gmail.com",
      "timeDuration" : time,
      "text": "lorem ipsum like um he hello I meant Instagram and Linkedin and Twitter tiktok"
    })
    console.log(data);
    setDetails(data);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="mic__container">
          <img src={micIcon} alt="mic" />
        </div>
        <div>
          {isListening ? (
            <span>🎙 Listening...</span>
          ) : (
            <span>🛑 Click Start...</span>
          )}
        </div>
      </div>
      <div className="buttons_wrapper">
        <div className="stop_watch">
          <Timer time={time} />
        </div>
        <button onClick={handleSaveNote} disabled={!note}>
          Save the Note
        </button>
        <button onClick={handleStartStop}>Start/Stop</button>
      </div>
    </div>
  );
};

export default Speech;
