import { useState } from "react";
import PropTypes from "prop-types";
import Img3 from "../images/memesupreme.jpg";

const Popup = ({ xPosition, yPosition }) => {
  return (
    <div
      className="popup"
      style={{ top: `${yPosition}px`, left: `${xPosition}px` }}
    >
      <form className="popupForm">
        <fieldset>
          <div>
            <input type="radio" id="waldo" name="character" value="waldo" />
            <label htmlFor="waldo">Waldo</label>
          </div>
          <div>
            <input type="radio" id="rick" name="character" value="rick" />
            <label htmlFor="rick">Rick</label>
          </div>
          <div>
            <input type="radio" id="ed" name="character" value="ed" />
            <label htmlFor="ed">Ed</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const WorldThree = () => {
  const [modal, setModal] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
  });

  const handleImgClick = (e) => {
    let height = e.target.clientHeight;
    let width = e.target.clientWidth;
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;

    if (x + 150 > width) {
      let diff = x + 150 - width;
      x -= diff;
    }

    if (y + 150 > height) {
      let diff = y + 150 - height;
      y -= diff;
    }

    setModal({
      active: true,
      xPosition: x,
      yPosition: y,
    });
  };

  // Reset to default
  const handlePopupClick = () => {
    setModal({
      active: false,
      xPosition: 0,
      yPosition: 0,
    });
  };

  return (
    <div className="worldThreePage">
      <div className="worldImgWrapper">
        <img src={Img3} alt="memesupreme Image" onClick={handleImgClick} />
        {modal.active === true && (
          <Popup xPosition={modal.xPosition} yPosition={modal.yPosition} />
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
};

export default WorldThree;
