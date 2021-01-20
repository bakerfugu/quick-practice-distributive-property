import React, { useState } from "react";
import { 
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Confetti from 'react-confetti'

import Question from "./question";
import questions from "./questions.json";

const questionsList = questions.questions;

export default function QuestionManager() {
  const [open, setOpen] = useState(false);
  const [canMoveOn, setCanMoveOn] = useState(false);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);

  const handleNextQuestion = (chosenAnswers) => {
    const allCorrect = questionsList[currentQuestionNum].answers.every(
      (answer, index) => answer.isCorrect === chosenAnswers[index]
    );

    setCanMoveOn(allCorrect);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moveToQuestion = (nextQuestionNum) => {
    setCurrentQuestionNum(nextQuestionNum);
    setCanMoveOn(false);
    setOpen(false);
  }

  return (
    <>
      <Question
        question={questionsList[currentQuestionNum]}
        questionNumber={currentQuestionNum + 1}
        handleNextQuestion={handleNextQuestion}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {canMoveOn ? 
            currentQuestionNum + 1 < questionsList.length ?
              "Success! Great Work!" 
              :
              "Woohoo! You Finished!"
            : 
            "Not quite..."
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { canMoveOn ?
               currentQuestionNum + 1 < questionsList.length ?
                "Slide on over to the next problem."
                :
                "Great job demonstrating what you've learned! It looks like you've got it down, love to see it!"
              :
              `Try simplifying the expression by combining like terms. ` +
              `You should end up with an expression like this: ${questionsList[currentQuestionNum].height}(a + b). ` +
              `Then make sure that each side of the expression adds up to one of the numbers from the question.`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { canMoveOn ?
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => {
                moveToQuestion(
                  currentQuestionNum + 1 < questionsList.length ?
                  currentQuestionNum + 1
                  :
                  0
                )
              }} 
              autoFocus
            >
              {currentQuestionNum + 1 < questionsList.length ?
                "Next Question"
                :
                "Restart"
              }
            </Button>
          :
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleClose}
            autoFocus
          >
              Try Again
            </Button>
          }
        </DialogActions>
      </Dialog>
      { open && canMoveOn && currentQuestionNum + 1 === questionsList.length &&
        <Confetti/>
      }
    </>
  );
}
