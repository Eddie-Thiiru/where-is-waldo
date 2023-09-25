import PropTypes from "prop-types";

const Characters = ({ characterOne, characterTwo, characterThree }) => {
  return (
    <>
      <div className="character">
        <img src={characterOne.image} alt="" />
        <h4>{characterOne.name}</h4>
      </div>
      <div className="character">
        <img src={characterTwo.image} alt="" />
        <h4>{characterTwo.name}</h4>
      </div>
      <div className="character">
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
};

export default Characters;
