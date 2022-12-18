import Sidebar from "../Sidebar/Sidebar";
import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="App">
      <div className="leftside">
        <Sidebar />
      </div>
      <div className="rightside"></div>
    </div>
  );
};

export default Homepage;
