import { useState } from "react";
import PropTypes from "prop-types";
import worldImg from "../images/PrehISOria.png";

const Popup = ({ xPosition, yPosition }) => {
  return (
    <div
      className="popup"
      style={{ top: `${yPosition}px`, left: `${xPosition}px` }}
    >
      <form className="popupForm">
        <fieldset>
          <div>
            <input type="radio" id="mario" name="character" value="mario" />
            <label htmlFor="mario">Mario</label>
          </div>
          <div>
            <input
              type="radio"
              id="blastoise"
              name="character"
              value="blastoise"
            />
            <label htmlFor="blastoise">Blastoise</label>
          </div>
          <div>
            <input type="radio" id="crono" name="character" value="crono" />
            <label htmlFor="crono">Crono</label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const WorldOne = () => {
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
    <div className="worldOnePage">
      <div className="worldImgWrapper">
        <img src={worldImg} alt="PrehISOria Image" onClick={handleImgClick} />
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

export default WorldOne;
