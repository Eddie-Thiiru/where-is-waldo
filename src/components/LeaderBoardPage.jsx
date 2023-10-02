import { useNavigate } from "react-router-dom";

import Img1 from "../images/PrehISOria.png";
import Img2 from "../images/ISOrd & ISOrcery.png";
import Img3 from "../images/memesupreme.jpg";

import "../styles/leaderBoardPage.css";

const LeaderboardPage = () => {
  const navigate = useNavigate();

  const handleClick = (world) => {
    navigate(`/leaderboard/${world}`);
  };

  return (
    <div className="leaderboardPage">
      <div className="mainLeaderBoard">
        <h2>Game Leaderboards</h2>
        <div className="pageImgContainer">
          <div
            className="pageImgWrapper"
            onClick={() => handleClick("prehisoria")}
          >
            <img src={Img1} alt=""></img>
            <h3>
              Prehisoria
              <br />
              Leaderboard
            </h3>
          </div>
          <div className="pageImgWrapper" onClick={() => handleClick("isord")}>
            <img src={Img2} alt=""></img>
            <h3>
              Isord
              <br />
              Leaderboard
            </h3>
          </div>
          <div
            className="pageImgWrapper"
            onClick={() => handleClick("memesupreme")}
          >
            <img src={Img3} alt=""></img>
            <h3>
              Memesupreme
              <br />
              Leaderboard
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
