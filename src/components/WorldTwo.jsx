import { useState } from "react";
import PropTypes from "prop-types";
import Img2 from "../images/ISOrd & ISOrcery.png";

const Popup = ({ xPosition, yPosition }) => {
  return (
    <div
      className="popup"
      style={{ top: `${yPosition}px`, left: `${xPosition}px` }}
    >
      <form className="popupForm">
        <fieldset>
          <div>
            <input type="radio" id="gandalf" name="character" value="gandalf" />
            <label htmlFor="gandalf">Gandalf</label>
          </div>
          <div>
            <input type="radio" id="shrek" name="character" value="shrek" />
            <label htmlFor="shrek">Shrek</label>
          </div>
          <div>
            <input type="radio" id="genie" name="character" value="genie" />
            <label htmlFor="genie">Genie</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const WorldTwo = () => {
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
    <div className="WorldTwoPage">
      <div className="worldImgWrapper">
        <img src={Img2} alt="ISOrd & ISOrcery Image" onClick={handleImgClick} />
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

export default WorldTwo;
