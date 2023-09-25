import { useState } from "react";
import PropTypes from "prop-types";
import Characters from "./Characters";

import Img2 from "../images/ISOrd & ISOrcery.png";
import gandalfImg from "../images/gandalf.png";
import shrekImg from "../images/shrek.png";
import genieImg from "../images/genie.png";

const Popup = ({
  xPosition,
  yPosition,
  heightExceeded,
  widthExceeded,
  handleClick,
}) => {
  let widthFlexDirection = "row";
  let heightAlign = "flex-start";

  if (widthExceeded === true) {
    widthFlexDirection = "row-reverse";
  }

  if (heightExceeded === true) {
    heightAlign = "flex-end";
  }

  return (
    <div
      className="popup"
      style={{
        top: `${yPosition}px`,
        left: `${xPosition}px`,
        flexDirection: widthFlexDirection,
      }}
    >
      <div className="targetBox" style={{ alignSelf: heightAlign }}></div>
      <div className="characterBox">
        <Characters
          characterOne={{ name: "Gandalf", image: gandalfImg }}
          characterTwo={{ name: "Shrek", image: shrekImg }}
          characterThree={{ name: "Genie", image: genieImg }}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

const WorldTwo = () => {
  const [modal, setModal] = useState({
    active: false,
    xPosition: 0,
    yPosition: 0,
    heightExceeded: false,
    widthExceeded: false,
  });

  const handleImgClick = (e) => {
    let height = e.target.clientHeight;
    let width = e.target.clientWidth;
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let xExceeded = false;
    let yExceeded = false;

    // if width of modal exceeds image edge
    if (x + 200 > width) {
      // Change modal position by subtracting from it's X coordinate value.
      x -= 160;
      xExceeded = true;

      if (x + 200 > width) x -= 20;
    }

    // if height of modal exceeds image edge
    if (y + 180 > height) {
      // Change modal position by subtracting from it's Y coordinate value.
      y -= 140;
      yExceeded = true;

      if (y + 200 > height) y -= 20;
    }

    /* 
      Also subtract X and Y positions by half of the Target Box's dimensions to
      ensure that the clicked position is centered within the Target Box.
    */
    if (y - 20 > 0) y -= 20;
    if (x - 20 > 0) x -= 20;

    setModal({
      active: true,
      xPosition: x,
      yPosition: y,
      heightExceeded: yExceeded,
      widthExceeded: xExceeded,
    });
  };

  // Reset to default
  const handlePopupClick = (e) => {
    console.log(e.target.id);
    // setModal({
    //   active: false,
    //   xPosition: 0,
    //   yPosition: 0,
    // heightExceeded: false,
    // widthExceeded: false,
    // });
  };

  return (
    <div className="WorldTwoPage">
      <div className="worldImgWrapper">
        <img src={Img2} alt="ISOrd & ISOrcery Image" onClick={handleImgClick} />
        {modal.active === true && (
          <Popup
            xPosition={modal.xPosition}
            yPosition={modal.yPosition}
            heightExceeded={modal.heightExceeded}
            widthExceeded={modal.widthExceeded}
            handleClick={handlePopupClick}
          />
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
  heightExceeded: PropTypes.bool,
  widthExceeded: PropTypes.bool,
  handleClick: PropTypes.func,
};
export default WorldTwo;
