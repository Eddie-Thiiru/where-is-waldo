import PropTypes from "prop-types";
import Characters from "./Characters";

const Popup = ({
  characters,
  targetXPos,
  targetYPos,
  modalXPos,
  modalYPos,
  handleCharacterClick,
  handleContainerClick,
}) => {
  return (
    <>
      <div
        className="targetBox"
        style={{
          top: `${targetYPos}px`,
          left: `${targetXPos}px`,
        }}
      ></div>
      <div
        className="popup"
        style={{
          top: `${modalYPos}px`,
          left: `${modalXPos}px`,
        }}
        onClick={handleContainerClick}
      >
        <div className="characterBox">
          <Characters
            charactersData={characters}
            handleClick={handleCharacterClick}
          />
        </div>
      </div>
    </>
  );
};

Popup.propTypes = {
  characters: PropTypes.array,
  targetXPos: PropTypes.number,
  targetYPos: PropTypes.number,
  modalXPos: PropTypes.number,
  modalYPos: PropTypes.number,
  handleCharacterClick: PropTypes.func,
  handleContainerClick: PropTypes.func,
};

export default Popup;
