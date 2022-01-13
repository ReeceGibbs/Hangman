/**
 * this component will be used to HangmanState the user's progress in the game
 * each time the user guesses a letter incorrectly, this will HangmanState will update to reflect that
 */
import './HangmanState.css';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import state0 from '../../assets/hangman_states/state0.gif';
import state1 from '../../assets/hangman_states/state1.gif';
import state2 from '../../assets/hangman_states/state2.gif';
import state3 from '../../assets/hangman_states/state3.gif';
import state4 from '../../assets/hangman_states/state4.gif';
import state5 from '../../assets/hangman_states/state5.gif';
import state6 from '../../assets/hangman_states/state6.gif';
import state7 from '../../assets/hangman_states/state7.gif';
import state8 from '../../assets/hangman_states/state8.gif';
import state9 from '../../assets/hangman_states/state9.gif';
import state10 from '../../assets/hangman_states/state10.gif';

// a list of every possible hangman state image
const hangman_states = [
    state0,
    state1,
    state2,
    state3,
    state4,
    state5,
    state6,
    state7,
    state8,
    state9,
    state10
];

function HangmanState(props) {
    return (
        <div className='display-component hangman-image'>
            <Image src={hangman_states[props.state]} />
        </div>
    );
}

/**
 * we define the expected prop types for the component
 */
HangmanState.propTypes = {
    state: PropTypes.number
}

export default HangmanState;