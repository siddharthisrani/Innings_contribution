/* eslint-disable react/prop-types */

import {
  SAMPLE_SCORECARD_BATTING_DATA_1,
  SAMPLE_SCORECARD_BATTING_DATA_2,
  SAMPLE_SCORECARD_BOWLING_DATA_1,
  SAMPLE_SCORECARD_BOWLING_DATA_2,
  SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_1,
  SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_2,
} from "../../../utilities/constants";

import ScorecardContainer from "./ScorecardContainer";
import ScorecardContent from "./ScorecardContent";
import ScorecardHeader from "./ScorecardHeader";
import ScorecardSkeleton from "../../skeletons/ScorecardSkeleton";
import TabsSegmentedControls from "../../TabsSegmentedControls";
import { useSelector } from "react-redux";
import { useState } from "react";

const battingData1 = SAMPLE_SCORECARD_BATTING_DATA_1;
const battingData2 = SAMPLE_SCORECARD_BATTING_DATA_2;
const bowlingData1 = SAMPLE_SCORECARD_BOWLING_DATA_1;
const bowlingData2 = SAMPLE_SCORECARD_BOWLING_DATA_2;
const nonBattingData1 = [
  "Matheesha Pathirana",
  "Maheesh Theekshana",
  "Tushar Deshpande",
  "Akash Singh",
];
const nonBattingData2 = [
  "Harshal Patel",
  "Vyshak Vijaykumar",
  "Mohammed Siraj",
];
const fallOfWicketsData1 = SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_1;
const fallOfWicketsData2 = SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_2;
const total1 = "226/6";
const total2 = "218/8";
const extras1 = "7";
const extras2 = "11";
const extrasDetails1 = "( nb 2, w 4, b 0, lb 1 )";
const extrasDetails2 = "( nb 0, w 6, b 0, lb 5 )";

const Scorecard = ({ isAdmin, isLoading }) => {
  const [index, setIndex] = useState(0);

  const team1 = useSelector((state) =>
    isAdmin ? state.matchManagement.team1 : state.match.team1
  );
  const team2 = useSelector((state) =>
    isAdmin ? state.matchManagement.team2 : state.match.team2
  );

  const team = index === 0 ? team1 : team2;
  const total = index === 0 ? total1 : total2;
  const battingData = index === 0 ? battingData1 : battingData2;
  const nonBattingData = index === 0 ? nonBattingData1 : nonBattingData2;
  const extras = index === 0 ? extras1 : extras2;
  const extrasDetails = index === 0 ? extrasDetails1 : extrasDetails2;
  const bowlingData = index === 0 ? bowlingData1 : bowlingData2;
  const fallOfWicketsData =
    index === 0 ? fallOfWicketsData1 : fallOfWicketsData2;

  return (
    <>
      {isLoading ? (
        <ScorecardSkeleton />
      ) : (
        <ScorecardContainer>
          <ScorecardHeader />
          <TabsSegmentedControls
            setIndex={setIndex}
            index={index}
            team1Name={team1.nameShort}
            team2Name={team2.nameShort}
          />
          <ScorecardContent
            team={team}
            total={total}
            battingData={battingData}
            bowlingData={bowlingData}
            nonBattingData={nonBattingData}
            extras={extras}
            extrasDetails={extrasDetails}
            fallOfWicketsData={fallOfWicketsData}
          />
        </ScorecardContainer>
      )}
    </>
  );
};

export default Scorecard;