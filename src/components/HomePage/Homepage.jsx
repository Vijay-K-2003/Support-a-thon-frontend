import Sidebar from "../Sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthProvider";
import Speech from "../Speech/Speech";
import "./Homepage.scss";

const Homepage = () => {
  const { auth } = useAuthContext();

  return (
    <div className="App">
      <div className="leftside">
        <Sidebar />
      </div>
      <div className="rightside">
        <div className="mic__wrapper">
          <Speech />
        </div>
        <div className="data__wrapper"></div>
      </div>
    </div>
  );
};

export default Homepage;
