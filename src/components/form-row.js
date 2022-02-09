import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
export default function FormRow(props) {
    let {word} = props
    return (
        <React.Fragment>
        <Grid item xs={2}>
            <Item sx={{
                textTransform: 'uppercase', 
                backgroundColor: word[0]?.color,
                }}>
                {word[0]?.letter}
            </Item>
        </Grid>
        <Grid item xs={2}>
            <Item sx={{
                textTransform: 'uppercase', 
                backgroundColor: word[1]?.color,
                }}>
                {word[1]?.letter}
            </Item>
        </Grid>
        <Grid item xs={2}>
            <Item sx={{
                textTransform: 'uppercase', 
                backgroundColor: word[2]?.color,
                }}>
                {word[2]?.letter}
            </Item>
        </Grid>
        <Grid item xs={2}>
            <Item sx={{
                textTransform: 'uppercase', 
                backgroundColor: word[3]?.color,
                }}>
                {word[3]?.letter}
            </Item>
        </Grid>
        <Grid item xs={2}>
            <Item sx={{
                textTransform: 'uppercase', 
                backgroundColor: word[4]?.color,
                }}>
                {word[4]?.letter}
            </Item>
        </Grid>
        </React.Fragment>
    );
}