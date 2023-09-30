import { useParams } from "react-router-dom";

const LeaderBoard = () => {
  return (
    <div className="leaderBoard">
      <header className="leaderBoardHeader">
        <h3>Rank</h3>
        <h3>Player</h3>
        <h3>Time</h3>
        <h3>Date</h3>
      </header>
      <section className="leaderBoardMain">
        <div className="leaderBoardPlayer">
          <p>1</p>
          <p>name</p>
          <p>10s</p>
          <p>today</p>
        </div>
        {/* <div className="emptyIndicator">
          <p>Empty</p>
        </div> */}
      </section>
    </div>
  );
};

const LeaderboardPage = () => {
  const { name } = useParams();

  return (
    <div className="leaderboardPage">
      {name === "prehisoria" ? (
        <div>PREHISTORIA</div>
      ) : name === "isord" ? (
        <div>ISORD</div>
      ) : name === "memesupreme" ? (
        <div>MEMESUPREME</div>
      ) : (
        <div>LEADERBOARD MAIN PAGE</div>
      )}
      {/* <h2>All Players</h2>
      <LeaderBoard /> */}
    </div>
  );
};

export default LeaderboardPage;
