import {useState, useEffect} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthProvider";
import Speech from "../Speech/Speech";
import "./Homepage.scss";
import axios from 'axios';

const Homepage = () => {
  const [details, setDetails] = useState(null);
  const { auth } = useAuthContext();
  // https://e9b8-2405-201-2010-5080-714f-def4-fb26-d729.in.ngrok.io/
  
  /**
   * email
: 
"vijay@gmail.com"
fillerPhrases
: 
"['I mean']"
fillerWords
: 
"['um', 'Like']"
id
: 
1
questionID
: 
1
recommendation
: 
"We would like to mention that it would be better if you avoid mentioning about tiktok and instagram in your interview.It would be further better if you could mention about your Github profile in the interview."
wpm
: 
168
   */

  return (
    <div className="Home">
      <div className="leftside">
        <Sidebar />
      </div>
      <div className="rightside">
        <div className="mic__wrapper">
          <Speech setDetails = {setDetails}/>
        </div>
        <div className="data__wrapper">
          <h2>Your Last Attempt Stats</h2>
          <div className="data__wrapper--stat">
            <ul>
              <li>
                {details?.data[0].questionID}
              </li>
              <li>{details?.data[0].fillerPhrases}</li>
              <li>
                {details?.data[0].fillerWords}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
