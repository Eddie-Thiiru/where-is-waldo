import PropTypes from "prop-types";
import Characters from "./Characters";
import useWorldState from "./utils/useWorldState";

import Img2 from "../images/ISOrd & ISOrcery.png";
import gandalfImg from "../images/gandalf.png";
import shrekImg from "../images/shrek.png";
import genieImg from "../images/genie.png";

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
  const [
    modal,
    feedback,
    marker,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ] = useWorldState();
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
          className={marker.one.status}
          style={{
            top: `${marker.one.yPosition}px`,
            left: `${marker.one.xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker.two.status}
          style={{
            top: `${marker.two.yPosition}px`,
            left: `${marker.two.xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker.three.status}
          style={{
            top: `${marker.three.yPosition}px`,
            left: `${marker.three.xPosition}px`,
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
