import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import FormRow from './form-row';

export default function LetterDisplay(props) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box style={{
        marginTop: 25,
        maxWidth: 325
      }} 
      sx={{ flexGrow: 1 }}
      >
        <Grid container spacing={1}>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[1]}/>
          </Grid>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[2]}/>
          </Grid>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[3]}/>
          </Grid>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[4]}/>
          </Grid>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[5]}/>
          </Grid>
          <Grid container 
          direction="row"
          justifyContent="center"
          alignItems="center" 
          item spacing={1}
          >
            <FormRow word={props.words[6]}/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
