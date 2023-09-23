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
      <div
        className="homepageImgWrapper"
        onClick={() => handleClick("world-one")}
      >
        <img src={Img1} alt=""></img>
        <h2>PrehISOria</h2>
      </div>
      <div
        className="homepageImgWrapper"
        onClick={() => handleClick("world-two")}
      >
        <img src={Img2} alt=""></img>
        <h2>ISOrd & ISOrcery</h2>
      </div>
      <div
        className="homepageImgWrapper"
        onClick={() => handleClick("world-three")}
      >
        <img src={Img3} alt=""></img>
        <h2>Meme Supreme</h2>
      </div>
    </div>
  );
};

export default Homepage;
