import PropTypes from "prop-types";

const Characters = ({ charactersData, handleClick }) => {
  return (
    <>
      {charactersData.map((character, index) => {
        let classStr = `character ${index}`;

        return (
          <div
            key={index}
            className={classStr}
            id={character.name}
            onClick={handleClick}
          >
            <img src={character.image} alt="" />
            <h4>{character.name}</h4>
          </div>
        );
      })}
    </>
  );
};

Characters.propTypes = {
  charactersData: PropTypes.array,
  handleClick: PropTypes.func,
};

export default Characters;
