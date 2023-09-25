import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Characters from "./Characters";

import Img2 from "../images/ISOrd & ISOrcery.png";
import gandalfImg from "../images/gandalf.png";
import shrekImg from "../images/shrek.png";
import genieImg from "../images/genie.png";

const data = {
  gandalf: 1,
  shrek: 2,
  genie: 3,
};

const Popup = ({
  xPosition,
  yPosition,
  heightExceeded,
  widthExceeded,
  handleCharacterClick,
  handleContainerClick,
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
      onClick={handleContainerClick}
    >
      <div className="targetBox" style={{ alignSelf: heightAlign }}></div>
      <div className="characterBox">
        <Characters
          characterOne={{ name: "Gandalf", image: gandalfImg }}
          characterTwo={{ name: "Shrek", image: shrekImg }}
          characterThree={{ name: "Genie", image: genieImg }}
          handleClick={handleCharacterClick}
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
  const [feedback, setFeedBack] = useState({
    wrongAnswer: false,
    correctAnswer: { status: false, name: "" },
  });

  const [marker, setMarker] = useState({
    gandalf: { status: "hidden", xPosition: 0, yPosition: 0 },
    shrek: { status: "hidden", xPosition: 0, yPosition: 0 },
    genie: { status: "hidden", xPosition: 0, yPosition: 0 },
  });

  useEffect(() => {
    // Remove feedback popup after timeout
    const timeout = setTimeout(() => {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: false, name: "" },
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [feedback]);

  const handleImgClick = (e) => {
    if (modal.active) {
      resetModalState();
      return;
    }

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

  const handlePopupClick = (e) => {
    const characterName = e.target.id.toLowerCase();

    if (data[characterName] === 1) {
      setFeedBack({
        wrongAnswer: false,
        correctAnswer: { status: true, name: characterName },
      });

      setMarker({
        ...marker,
        [characterName]: {
          status: "visible",
          xPosition: modal.xPosition,
          yPosition: modal.yPosition,
        },
      });
    } else {
      setFeedBack({
        wrongAnswer: true,
        correctAnswer: { status: false, name: "" },
      });
    }
  };

  // Reset to default
  const resetModalState = () => {
    setModal({
      active: false,
      xPosition: 0,
      yPosition: 0,
      heightExceeded: false,
      widthExceeded: false,
    });
  };

  return (
    <div className="WorldTwoPage">
      <div className="worldImgWrapper">
        <img src={Img2} alt="ISOrd & ISOrcery Image" onClick={handleImgClick} />
        {feedback.wrongAnswer === true ? (
          <div className="wrongAnswerPopup">
            <p>Try Again!</p>
          </div>
        ) : (
          feedback.correctAnswer.status === true && (
            <div className="correctAnswerPopup">
              <p>You found {feedback.correctAnswer.name}!</p>
            </div>
          )
        )}
        {modal.active === true && (
          <Popup
            xPosition={modal.xPosition}
            yPosition={modal.yPosition}
            heightExceeded={modal.heightExceeded}
            widthExceeded={modal.widthExceeded}
            handleCharacterClick={handlePopupClick}
            handleContainerClick={resetModalState}
          />
        )}
        <div
          className={marker.gandalf.status}
          style={{
            top: `${marker.gandalf.yPosition}px`,
            left: `${marker.gandalf.xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker.shrek.status}
          style={{
            top: `${marker.shrek.yPosition}px`,
            left: `${marker.shrek.xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker.genie.status}
          style={{
            top: `${marker.genie.yPosition}px`,
            left: `${marker.genie.xPosition}px`,
          }}
        >
          Here
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
  heightExceeded: PropTypes.bool,
  widthExceeded: PropTypes.bool,
  handleCharacterClick: PropTypes.func,
  handleContainerClick: PropTypes.func,
};

export default WorldTwo;
