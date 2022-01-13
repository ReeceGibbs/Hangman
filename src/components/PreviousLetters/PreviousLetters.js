/**
 * this component will be used to PreviousLetters the user's progress in the game
 * each time the user guesses a letter incorrectly, this will PreviousLetters will update to reflect that
 */
import './PreviousLetters.css';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PreviousLetters(props) {
    return (
        <Card className='display-component'>
            <Card.Body>
                <Card.Title>Previous Letters</Card.Title>
                <Card.Text>
                    {props.letters.map(letter => <span className='letter' key={letter}>{letter}</span>)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

/**
 * we define the expected prop types for the component
 */
 PreviousLetters.propTypes = {
    letters: PropTypes.array
}

export default PreviousLetters;