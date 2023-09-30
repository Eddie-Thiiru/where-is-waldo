import Img1 from "../images/PrehISOria.png";
import Img2 from "../images/ISOrd & ISOrcery.png";
import Img3 from "../images/memesupreme.jpg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/${e}`);
  };

  return (
    <div className="homepage">
      <div className="pageImgWrapper" onClick={() => handleClick("prehisoria")}>
        <img src={Img1} alt=""></img>
        <h3>PrehISOria</h3>
      </div>
      <div className="pageImgWrapper" onClick={() => handleClick("isord")}>
        <img src={Img2} alt=""></img>
        <h3>ISOrd & ISOrcery</h3>
      </div>
      <div
        className="pageImgWrapper"
        onClick={() => handleClick("memesupreme")}
      >
        <img src={Img3} alt=""></img>
        <h3>Meme Supreme</h3>
      </div>
    </div>
  );
};

export default Homepage;
