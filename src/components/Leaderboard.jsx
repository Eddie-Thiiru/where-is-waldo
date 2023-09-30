import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LeaderBoard = ({ world }) => {
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/leaderboard/${world}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.statusText);
      });
  }, []);

  return (
    <div className="leaderBoardWrapper">
      {loading === false && (
        <>
          <h2>Leaderboard</h2>
          <div className="leaderBoard">
            <header className="leaderBoardHeader">
              <h3>Rank</h3>
              <h3>Player</h3>
              <h3>Time</h3>
              <h3>Date</h3>
            </header>
            <section className="leaderBoardContent">
              <div>Test</div>
              {players.length === 0 ? (
                <div className="emptyIndicator">
                  <p>Empty</p>
                </div>
              ) : (
                players.map((player, index) => {
                  return (
                    <div key={index} className="leaderBoardPlayer">
                      <p>{index + 1}</p>
                      <p>{player.playerName}</p>
                      <p>{player.scoreTime}</p>
                      <p>{player.timestamp}</p>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

LeaderBoard.propTypes = {
  world: PropTypes.string,
};

export default LeaderBoard;
