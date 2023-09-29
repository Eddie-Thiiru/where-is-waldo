import Popup from "./CharactersPopup";
import Player from "./Player";
import useWorldState from "./utils/useWorldState";

import Img2 from "../images/ISOrd & ISOrcery.png";

const WorldTwo = () => {
  const [
    time,
    targetBox,
    modal,
    characters,
    feedback,
    marker,
    gameWon,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  ] = useWorldState("isord");

  return (
    <div className="WorldTwoPage">
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
            characters={characters}
            targetXPos={targetBox.xPos}
            targetYPos={targetBox.yPos}
            modalXPos={modal.xPosition}
            modalYPos={modal.yPosition}
            handleCharacterClick={handlePopupClick}
            handleContainerClick={resetModalState}
          />
        )}
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
        <div
          className={marker[3].status}
          style={{
            top: `${marker[3].yPosition}px`,
            left: `${marker[3].xPosition}px`,
          }}
        >
          Here
        </div>
        {gameWon === true && <Player time={time} />}
      </div>
    </div>
  );
};

export default WorldTwo;
