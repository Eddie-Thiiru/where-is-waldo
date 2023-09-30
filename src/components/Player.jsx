import { useContext } from "react";
import PropTypes from "prop-types";
import { WinContext } from "../App";

const Player = ({ time }) => {
  const { error, handleSubmit } = useContext(WinContext);
  const minutes = ("0" + Math.floor((time % 360000) / 6000)).slice(-2);
  const seconds = ("0" + Math.floor((time % 6000) / 100)).slice(-2);

  return (
    <div className="playerInput">
      <h3>Congratulations!</h3>
      <p>You finished in {`${minutes}:${seconds}s`}</p>
      <p>Add your score to the leaderboard</p>
      <form onSubmit={handleSubmit}>
        <div className="formScoreGroup">
          <label htmlFor="playerName">Name</label>
          <input type="text" id="playerName" name="playerName" required />
          {error.hasError === true && (
            <span className="errorMsg">{error.msg}</span>
          )}
        </div>
        <div className="formScoreGroup">
          <label htmlFor="scoreTime"></label>
          <input
            type="hidden"
            id="scoreTime"
            name="scoreTime"
            value={time}
            required
          />
        </div>
        <button type="submit" className="addPlayerBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

Player.propTypes = {
  time: PropTypes.number,
};

export default Player;
