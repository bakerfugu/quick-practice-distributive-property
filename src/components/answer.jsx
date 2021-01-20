import React, { useState } from "react";
import { 
  Grid, 
  Card,
  CardActionArea,
  CardContent,
  Box,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { BlockMath } from 'react-katex';

import BlockGrid from "./blockGrid";

const useStyles = makeStyles( theme => ({
  answerContainer: {
    borderRadius: "20px",
  },
  answerSelected: {
    borderRadius: "20px",
    margin: "-5px",
    border: "5px solid #8FBC8F",
    backgroundColor: "#E6F0E6",
  },
}));

export default function Answer({
  sharedDimension, 
  sharedDimensionSide,
  otherDimensionA, 
  otherDimensionB,
  updateSelected,
}) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(false);

  const sharingWidth = sharedDimensionSide === "width"
  const gridStackDirection = sharingWidth ? "column" : "row";
  
  return (
    <Card 
      className={isSelected ? classes.answerSelected : classes.answerContainer}
    >
      <CardActionArea
        onClick={() => {
          setIsSelected(!isSelected);
          if (updateSelected) updateSelected(!isSelected);
        }}
      >
        <CardContent>
          <Box
            height="8rem"
          >
            <Grid
              container
              direction={gridStackDirection}
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <BlockGrid
                  width={sharingWidth ? sharedDimension : otherDimensionA}
                  height={!sharingWidth ? sharedDimension : otherDimensionA}
                  size={0.8}
                  color="#ff0066"
                />
              </Grid>
              <Grid item>
                <BlockGrid
                  width={sharingWidth ? sharedDimension : otherDimensionB}
                  height={!sharingWidth ? sharedDimension : otherDimensionB}
                  size={0.8}
                  color="#0066ff"
                  hideLabel={ sharingWidth ? "top" : "side"}
                />
              </Grid>
            </Grid>
          </Box>
          <BlockMath>
            {`${sharedDimension} \\times ${otherDimensionA} + ${sharedDimension} \\times ${otherDimensionB}`}
          </BlockMath>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}