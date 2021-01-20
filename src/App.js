import React from "react";
import "./styles.css";
import QuestionManager from "./components/questionManager";
import { Typography, Grid, Box } from "@material-ui/core";

export default function App() {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Box width="90%">
        <Box height="20px" />
        <Typography variant="h4">Distributive Property</Typography>
        <Box height="20px" />
        <Grid container direction="column" justify="center" alignItems="center">
          <QuestionManager />
        </Grid>
      </Box>
    </Grid>
  );
}
