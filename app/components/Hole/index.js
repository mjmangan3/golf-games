/**
 *
 * Hole
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';

// import styled from 'styled-components';

function Hole({ score, number, setScore, handicap, par, disable }) {
  console.log(score);
  return (
    <Grid
      style={{ border: '1px solid' }}
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid
        item
        container
        justifyContent="center"
        style={{ backgroundColor: 'black' }}
      >
        <Grid item style={{ color: 'white' }}>
          {number}
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          label={par || undefined}
          value={score || ''}
          type="number"
          helperText={handicap || undefined}
          onChange={event => setScore(parseInt(event.target.value, 10), number)}
          InputProps={{
            inputProps: {
              style: { textAlign: 'center' },
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={disable}
        />
      </Grid>
    </Grid>
  );
}

Hole.propTypes = {
  score: PropTypes.number,
  number: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  setScore: PropTypes.func,
  handicap: PropTypes.number,
  par: PropTypes.number,
  disable: PropTypes.bool,
};

export default Hole;
