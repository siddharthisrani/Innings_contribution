import { Box, Card, useTheme } from "@mui/joy";
import {
  addRuns,
  setBallLog,
  setRuns,
} from "../../state/match/matchManagement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ActionsPane from "../../components/matchManagement/ActionsPane";
import BallLogList from "../../components/lists/BallLogList";
import BatsmenStats from "../../components/match/BatsmenStats";
import BattingStats from "../../components/matchManagement/BattingStats/BattingStats";
import BowlingStats from "../../components/matchManagement/BowlingStats";
import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import ConductToss from "../../components/matchManagement/ConductToss";
import Footer from "../../components/common/Footer";
import Header from "../../components/matchManagement/Header";
import Navbar from "../../components/common/Navbar/Navbar";
import ScoreInfo from "../../components/matchManagement/ScoreInfo";
import Scorecard from "../../components/match/Scorecard/Scorecard";
import ScoringButtonsPanel from "../../components/matchManagement/ScoringButtonsPanel";
import { matchManagementApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const MatchManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { matchId } = useParams();
  const status = useSelector((state) => state.matchManagement.status);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      matchManagementApi.getMatchManagementInfo({
        matchId,
        token,
        setIsLoading,
      })
    );
    dispatch(setRuns());
  }, [dispatch, matchId, token]);

  const ballLog = useSelector((state) => state.matchManagement.ball_log);
  const innings = useSelector((state) => state.matchManagement.innings);
  const batsmenData = useSelector((state) => state.matchManagement.batsmen);
  const { team1, team2, match_no } = useSelector(
    (state) => state.matchManagement
  );

  const isHeaderDataAvailable = team1 && team2 && match_no;

  const [tossCompleted, setTossCompleted] = useState(status);

  useEffect(() => {
    setTossCompleted(status === "ongoing");
  }, [status]);

  const secondInnings = innings && innings === "2";

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        socket.emit("subscribeToMatch", matchId);

        socket.on("getBallLog", (ball_log) => {
          dispatch(setBallLog(ball_log));
          dispatch(addRuns({ score: ball_log.runs_conceded }));
        });
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
    }
  }, [socket, matchId]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: isMobile ? "85vw" : "78vw",
          mx: "auto",
          gap: 2,
          mt: 4,
        }}>
        {isHeaderDataAvailable && (
          <Header
            isLoading={isLoading}
            team1={team1}
            team2={team2}
            match_no={match_no}
          />
        )}
        {!tossCompleted ? (
          team1 &&
          team2 && <ConductToss matchId={matchId} team1={team1} team2={team2} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                gap: isMobile ? 4 : 1.5,
                mt: 4,
                width: "100%",
              }}>
              <Card
                sx={{
                  justifyContent: "space-between",
                  minHeight: "85vh",
                }}>
                <ScoreInfo isLoading={isLoading} />
                {secondInnings && <ChaseStatsCard isAdmin={true} />}
                <ScoringButtonsPanel socket={socket} disabled={isLoading} />
              </Card>
              <Card
                sx={{
                  width: "100%",
                  maxHeight: "85vh",
                  minHeight: "85vh",
                  overflow: "auto",
                  justifyContent: "space-between",
                }}>
                <ActionsPane isLoading={isLoading} />
                <BatsmenStats
                  data={batsmenData}
                  isSmall={true}
                  isLoading={isLoading}
                />
                <BallLogList
                  isSmall={true}
                  data={ballLog}
                  isLoading={isLoading}
                />
                <BattingStats isLoading={isLoading} />
                <BowlingStats isLoading={isLoading} />
              </Card>
            </Box>
            <Box mb={8}>
              <Scorecard isAdmin={true} isLoading={isLoading} />
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MatchManagement;
