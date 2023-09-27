import PropTypes from "prop-types";
import Characters from "./Characters";
import useWorldState from "./utils/useWorldState";

import worldImg from "../images/PrehISOria.png";

const Popup = ({
  characters,
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
          charactersData={characters}
          handleClick={handleCharacterClick}
        />
      </div>
    </div>
  );
};

const WorldOne = () => {
  const [
    time,
    modal,
    characters,
    feedback,
    marker,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ] = useWorldState("worldOne");

  return (
    <div className="worldOnePage">
      <div className="timer">
        <p>
          <span className="minutes">
            {("0" + Math.floor((time % 360000) / 6000)).slice(-2)}:
          </span>
          <span className="seconds">
            {("0" + Math.floor((time % 6000) / 100)).slice(-2)}:
          </span>
          <span className="milliseconds">{("0" + (time % 100)).slice(-2)}</span>
        </p>
      </div>
      <div className="worldImgWrapper">
        <img src={worldImg} alt="PrehISOria Image" onClick={handleImgClick} />
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
            characters={characters}
            xPosition={modal.xPosition}
            yPosition={modal.yPosition}
            heightExceeded={modal.heightExceeded}
            widthExceeded={modal.widthExceeded}
            handleCharacterClick={handlePopupClick}
            handleContainerClick={resetModalState}
          />
        )}
        <div
          className={marker[0].status}
          style={{
            top: `${marker[0].yPosition}px`,
            left: `${marker[0].xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker[1].status}
          style={{
            top: `${marker[1].yPosition}px`,
            left: `${marker[1].xPosition}px`,
          }}
        >
          Here
        </div>
        <div
          className={marker[2].status}
          style={{
            top: `${marker[2].yPosition}px`,
            left: `${marker[2].xPosition}px`,
          }}
        >
          Here
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  characters: PropTypes.array,
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
  heightExceeded: PropTypes.bool,
  widthExceeded: PropTypes.bool,
  handleCharacterClick: PropTypes.func,
  handleContainerClick: PropTypes.func,
};

export default WorldOne;
