import React from "react";
import { Typography, Grid, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  gridParent: (props) => {
    const calcFontSize = props.size > 2 ? "1.8rem" : `${props.size * 0.9}rem`;
    // if (props.size < 15 && width > 3 and)
    return {
      fontSize: calcFontSize,
      justifyContent: "center",
      width: "auto"
    };
  },
  block: (props) => ({
    backgroundColor: props.color,
    height: `${props.size}rem`,
    width: `${props.size}rem`
  }),
  rowLabel: (props) => ({
    height: "100%",
    paddingRight: `${props.size * 3}px`
  }),
  columnLabel: (props) => ({
    height: "100%",
    marginTop: `-${props.size * 2}px`
  }),
  labelText: {
    fontSize: "1em"
  }
});

export default function BlockGrid({ height, width, color, size, hideLabel }) {
  const classes = useStyles({ color, size });

  const rowIndexes = [...Array(height).keys()];
  const colIndexes = [...Array(width).keys()];
  const gridWidth = width * (size + convertPixelToRem(2));
  const gridHeight = height * (size + convertPixelToRem(2));
  const labelSize = size > 2 ? "2rem" : `${size}rem`;

  function Block() {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        square={true}
        className={classes.block}
      />
    );
  }

  function Row() {
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {colIndexes.map((colIndex) => (
          <Box width={1 / colIndexes.length} key={colIndex}>
            <Block />
          </Box>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container direction="row" className={classes.gridParent}>
      {hideLabel !== "side" && (
        <Box width={labelSize}>
          {hideLabel !== "top" && <Box height={labelSize} />}
          <Box height={`${gridHeight}rem`}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.rowLabel}
            >
              <Typography className={classes.labelText}>{height}</Typography>
            </Grid>
          </Box>
        </Box>
      )}
      <Box width={`${gridWidth}rem`}>
        <Grid container direction="column">
          {hideLabel !== "top" && (
            <Box height={labelSize}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-end"
                className={classes.columnLabel}
              >
                <Typography className={classes.labelText}>{width}</Typography>
              </Grid>
            </Box>
          )}
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {rowIndexes.map((rowIndex) => (
              <Box
                height={1 / rowIndexes.length}
                width="100%"
                key={"hiya row" + rowIndex}
              >
                <Row />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

function convertPixelToRem(pixels) {
  return (
    pixels / parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
}
