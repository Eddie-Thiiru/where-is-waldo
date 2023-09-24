import { useState } from "react";
import PropTypes from "prop-types";
import worldImg from "../images/PrehISOria.png";
import marioImg from "../images/mario.png";
import blastoiseImg from "../images/blastoise.png";
import cronoImg from "../images/crono.png";

const Popup = ({ xPosition, yPosition }) => {
  return (
    <div
      className="popup"
      style={{ top: `${yPosition}px`, left: `${xPosition}px` }}
    >
      <div className="popupCharacter">
        <img src={marioImg} alt="" />
        <h4>Mario</h4>
      </div>
      <div className="popupCharacter">
        <img src={blastoiseImg} alt="" />
        <h4>Blastoise</h4>
      </div>
      <div className="popupCharacter">
        <img src={cronoImg} alt="" />
        <h4>Crono</h4>
      </div>
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
      let diff = y + 180 - height;
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
