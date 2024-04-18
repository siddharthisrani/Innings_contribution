/* eslint-disable react/prop-types */

import { Box, Button, Stack, Typography, useTheme } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomModal from "../notifications/modals/CustomModal";
import { FiCheckCircle } from "react-icons/fi";
import TeamBadgeHorizontal from "../dataDisplay/TeamBadgeHorizontal";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const Header = ({ isLoading, team1, team2, match_no }) => {
  const matchNumber = match_no;

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { tournamentId } = useParams();
  const { matchId } = useParams();

  const handleGoBackRequest = () => {
    navigate(`/tournaments/${tournamentId}/${matchId}`);
  };

  const [openCompleteScoringModal, setOpenCompleteScoringModal] =
    useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
        }}>
        <Typography level={isMobile ? "h4" : "h3"} sx={{ opacity: 0.5 }} noWrap>
          # {matchNumber}
        </Typography>
        <TeamBadgeHorizontal
          team={team1}
          isSmall={false}
          isLoading={isLoading}
        />
        <Typography level={isMobile ? "title-lg " : "h4"} color="neutral">
          vs
        </Typography>
        <TeamBadgeHorizontal
          team={team2}
          isSmall={false}
          isLoading={isLoading}
        />
      </Box>
      <Stack direction={"row"} gap={2}>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<ArrowBackIcon />}
          onClick={() => handleGoBackRequest()}>
          Go Back
        </Button>
        <Button
          variant="solid"
          color="success"
          size={isMobile ? "sm" : "lg"}
          sx={{ width: 300 }}
          disabled={isLoading}
          onClick={() => setOpenCompleteScoringModal(true)}
          endDecorator={<FiCheckCircle size={isMobile ? 18 : 21} />}>
          Complete Scoring
        </Button>
        <CustomModal
          open={openCompleteScoringModal}
          setOpen={setOpenCompleteScoringModal}
          title={"Confirm Completion"}
          content={
            "Are you sure you have input all data and want to complete scoring for this match?"
          }
          useCase={"completeScoring"}
        />
      </Stack>
    </Box>
  );
};

export default Header;
