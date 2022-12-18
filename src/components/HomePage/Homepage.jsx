import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { generalQuestions, softwareQuestions } from "../../utils/questions";

import Sidebar from "../Sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthProvider";
import Speech from "../Speech/Speech";
import "./Homepage.scss";
import axios from "axios";

const Homepage = () => {
  const [details, setDetails] = useState(null);
  const { auth, qId } = useAuthContext();
  // https://e9b8-2405-201-2010-5080-714f-def4-fb26-d729.in.ngrok.io/
  const [active, setActive] = useState(-1);

  // if (!auth) {
  //   return (
  //     <div className="Home_second">
  //       <div className="message">
  //         First <Link to="/login">Login</Link> to try this feature
  //       </div>
  //     </div>
  //   );
  // }

  console.log(details);

  let fillerWords;
  return (
    <div className="Home">
      <div className="leftside">
        <Sidebar />
      </div>
      <div className="rightside">
        <div className="mic__wrapper">
          <Speech setDetails={setDetails} />
        </div>
        <div className="sample_answer">
          <h3>Sample Answer: </h3>
          {qId <= 5
            ? generalQuestions.map((q, index) => {
                if (q.id == qId) {
                  return <p key={index}>{q.sampleAnswer}</p>;
                }
              })
            : softwareQuestions.map((q, index) => {
                if (q.id == qId) {
                  return <p key={index}>{q.sampleAnswer}</p>;
                }
              })}
        </div>
        <div className="data__wrapper">
          <h2>Your Previous Attempt Stats</h2>
          {details?.data?.map((data, index) => {
            if (qId === data.questionID) {
              if (index < 3) {
                return (
                  <div key={index} className="data__display">
                    <div key={index + 1} className="data__display--header">
                      <p>Attempt {index + 1}</p>
                      <RiArrowDropDownLine
                        onClick={() => {
                          if (active === -1) {
                            setActive(index);
                          }

                          if (active === index) {
                            setActive(-1);
                          }
                        }}
                        size={25}
                      />
                    </div>
                    <div className="data__info">
                      {active === index && (
                        <div>
                          <p>
                            <strong>Email :</strong> {data.email}
                          </p>
                          <p>
                            <strong>Question Id:</strong> {data.questionID}
                          </p>
                          <p>
                            <strong>Recomendation:</strong>{" "}
                            {data.recommendation}
                          </p>
                          <p style={{ display: "flex", gap: "10px" }}>
                            <strong>Filler Words: </strong>
                            {JSON.parse(
                              data.fillerWords.replace(/'/g, '"')
                            ).map((word, index) => (
                              <p key={index + 1}>{word} </p>
                            ))}
                          </p>
                          <p style={{ display: "flex", gap: "10px" }}>
                            <strong>Filler Phrases: </strong>
                            {JSON.parse(
                              data.fillerPhrases.replace(/'/g, '"')
                            ).map((word, index) => (
                              <p key={index + 1}>{word} </p>
                            ))}
                          </p>
                          <p>
                            <strong>Words per minute: </strong> {data.wpm}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
