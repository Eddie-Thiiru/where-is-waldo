import Popup from "./CharactersPopup";
import useWorldState from "./utils/useWorldState";

import worldImg from "../images/PrehISOria.png";

const WorldOne = () => {
  const {
    targetBox,
    modal,
    characters,
    feedback,
    marker,
    handleImgClick,
    handlePopupClick,
    resetModalState,
  } = useWorldState("prehisoria");

  return (
    <div className="worldOnePage">
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
      </div>
    </div>
  );
};

export default WorldOne;
