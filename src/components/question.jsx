import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

import BlockGrid from "./blockGrid";
import Answer from "./answer";

const useStyles = makeStyles((theme) => ({
  questionNumber: {
    textAlign: "right"
  },
  questionContainer: {
    maxWidth: "40rem"
  },
  questionText: {
    paddingLeft: "3rem"
  },
  nextButton: {
    marginLeft: "auto"
  },
  answerContainer: {
    marginTop: "0.5rem"
  }
}));

export default function Question({
  question,
  questionNumber,
  handleNextQuestion
}) {
  const classes = useStyles();
  const [selectedAnswers, setSelectedAnswers] = useState([
    false,
    false,
    false,
    false
  ]);
  const product = question.height * question.width;

  useEffect(() => {
    setSelectedAnswers([false, false, false, false]);
  }, [questionNumber]);

  const changeSelection = (index, isSelected) => {
    let newSelections = [...selectedAnswers];
    newSelections[index] = isSelected;
    setSelectedAnswers(newSelections);
  };

  return (
    <Box width="100%">
      <Paper className={classes.questionContainer}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className={classes.questionNumber}
            >
              Question {questionNumber} / 5
            </Typography>
            <BlockGrid
              width={question.width}
              height={question.height}
              size={1.5}
              color="#944dff"
            />
            <BlockMath>
              {`${question.height} \\times ${question.width} = ${product}`}
            </BlockMath>
            <Typography
              variant="h6"
              component="p"
              className={classes.questionText}
            >
              Which expressions are also equal to {product}?
            </Typography>
            <Grid container spacing={4} className={classes.answerContainer}>
              {question.answers.map((answer, index) => (
                <Grid item xs={6} key={JSON.stringify(answer)}>
                  <Answer
                    sharedDimension={question[answer.sharedDimensionSide]}
                    sharedDimensionSide={answer.sharedDimensionSide}
                    otherDimensionA={answer.otherDimensionA}
                    otherDimensionB={answer.otherDimensionB}
                    updateSelected={(isSelected) => {
                      changeSelection(index, isSelected);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              className={classes.nextButton}
              onClick={() => {
                handleNextQuestion(selectedAnswers);
              }}
            >
              Next
              <NavigateNextIcon />
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  );
}
