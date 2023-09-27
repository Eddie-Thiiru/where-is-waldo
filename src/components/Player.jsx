import PropTypes from "prop-types";

const Player = ({ time }) => {
  const minutes = ("0" + Math.floor((time % 360000) / 6000)).slice(-2);
  const seconds = ("0" + Math.floor((time % 6000) / 100)).slice(-2);

  return (
    <div className="playerInput">
      <h3>Congratulations!</h3>
      <p>You finished in {`${minutes}:${seconds}s`}</p>
      <p>Add your score to the leaderboard</p>
      <form method="POST" action="">
        <div className="formScoreGroup">
          <label htmlFor="playerName">Name</label>
          <input type="text" id="playerName" name="playerName" required />
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
