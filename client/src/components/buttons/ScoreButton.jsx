/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ScoreButton = ({ score, type, socket }) => {
  const { matchId } = useParams();

  const { batsmen, bowler, battingTeam, bowlingTeam, current_innings_no } =
    useSelector((state) => state.matchManagement);

  const handleClick = () => {
    if (type === "extra") {
      const extraLogItem = {
        extraType: score,
        runs: 1,
        bowler,
        matchId,
        bowlingTeamId: bowlingTeam._id,
      };
      socket.emit("addExtra", extraLogItem);
    } else {
      const runLogData = {
        matchId,
        battingTeamId: battingTeam._id,
        bowlingTeamId: bowlingTeam._id,
        batsman: batsmen.onStrikeBatsman,
        bowler,
        runs_scored: type === "dot" ? 0 : parseInt(score),
        innings_no: current_innings_no,
      };
      socket.emit("addRun", runLogData);
    }
  };
  return (
    <Button sx={{ height: 50, flexGrow: 1 }} onClick={handleClick}>
      {type === "dot" ? (
        <GoDotFill size={18} />
      ) : (
        <Typography level="title-md">{score}</Typography>
      )}
    </Button>
  );
};

export default ScoreButton;
