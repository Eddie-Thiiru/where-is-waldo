import PropTypes from "prop-types";

const Characters = ({
  characterOne,
  characterTwo,
  characterThree,
  handleClick,
}) => {
  return (
    <>
      <div className="character" id={characterOne.name} onClick={handleClick}>
        <img src={characterOne.image} alt="" />
        <h4>{characterOne.name}</h4>
      </div>
      <div className="character" id={characterTwo.name} onClick={handleClick}>
        <img src={characterTwo.image} alt="" />
        <h4>{characterTwo.name}</h4>
      </div>
      <div className="character" id={characterThree.name} onClick={handleClick}>
        <img src={characterThree.image} alt="" />
        <h4>{characterThree.name}</h4>
      </div>
    </>
  );
};

Characters.propTypes = {
  characterOne: PropTypes.object,
  characterTwo: PropTypes.object,
  characterThree: PropTypes.object,
  handleClick: PropTypes.func,
};

export default Characters;
