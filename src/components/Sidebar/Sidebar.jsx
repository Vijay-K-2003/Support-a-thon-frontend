import { useState } from "react";

import { generalQuestions, softwareQuestions } from "../../utils/questions";
import { useAuthContext } from "../../context/AuthProvider";
import "./Sidebar.scss";

function Sidebar() {
  const [category, setCategory] = useState("General");
  const { qId, setQId } = useAuthContext();

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="sidenav">
      <div className="sidenav__dropdown">
        <select name="category" id="category" onChange={handleChange}>
          <option value="General">General</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
      </div>

      <div className="sidenav__wrapper">
        <ol className="sidenav__wrapper--links">
          {category === "General"
            ? generalQuestions.map((question, index) => (
                <li
                  key={question.question}
                  className="sidenav__wrapper--link"
                  onClick={() => setQId(question.id)}
                >
                  <div>{index + 1}. </div>
                  <span>{question.question}</span>
                </li>
              ))
            : softwareQuestions.map((question, index) => (
                <li
                  key={question.question}
                  className="sidenav__wrapper--link"
                  onClick={() => setQId(question.id)}
                >
                  <div>{index + 1}. </div>
                  <span>{question.question}</span>
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
}

export default Sidebar;
