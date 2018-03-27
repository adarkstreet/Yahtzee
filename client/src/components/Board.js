import React from 'react';
import Dice from './Dice';
import { Grid, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { rollDice } from '../actions/currentGame';

const Board = ({ roll, dice, keep, dispatch }) => {
  let maxRoll = roll === 3;
  let disabled = maxRoll ? { disabled: true } : {}

  return (
    <Grid>
      <Grid.Row>
        <Button 
          fluid 
          onClick={() => dispatch(rollDice())}
          {...disabled}
        >
          { maxRoll ? 'Score Roll' : 'Roll' }
        </Button>
        <Grid.Column width={16}>
          <Divider hidden />
        </Grid.Column>
        { roll > 0 && 
          dice.map( (d, i) => {
            let kept = keep.includes(i);
            return (
              <Dice 
                key={i} 
                value={d} 
                kept={kept} 
                index={i}
              /> 
            ) 
          })
        }
      </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  let { dice, keep, roll } = state.currentGame;
  return { dice, keep, roll }
}

export default connect(mapStateToProps)(Board);