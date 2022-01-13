/**
 * this component will be used to Input the user's progress in the game
 * each time the user guesses a letter incorrectly, this will Input will update to reflect that
 */
import './Input.css';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

function Input(props) {
    return (
        <div className='Input-content'>
            <Row>
                {props.wordLetters.map((letter, index) =>
                    <Col className='input-column' key={`${letter}_${index}`}>
                        <h1 className={`letter-content win ${props.previousLetters.includes(letter) || props.gameOver ? 'show' : 'hide'}`}>{letter}</h1>
                    </Col>
                )}
            </Row>
            <Row>
                {props.wordLetters.map((letter, index) =>
                    <Col className='input-column' key={`${letter}_${index}_score`}>
                        <h1 className='score-content'>__</h1>
                    </Col>)}
            </Row>
        </div>
    );
}

/**
* we define the expected prop types for the component
*/
Input.propTypes = {
    wordLetters: PropTypes.array,
    previousLetters: PropTypes.array,
    gameOver: PropTypes.bool
}

export default Input;