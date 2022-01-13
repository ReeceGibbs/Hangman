/**
 * this component will be used to display the user's progress in the game
 * each time the user guesses a letter incorrectly, this will display will update to reflect that
 */
import './Display.css';
import { Row, Col, Button, Container, OverlayTrigger, Popover } from 'react-bootstrap';
import PreviousLetters from './../PreviousLetters/PreviousLetters';
import HangmanState from '../HangmanState/HangmanState';
import React, { useState } from 'react';
import Input from '../Input/Input';
import dictionary from '../../assets/dictionary';
import { QuestionCircle } from 'react-bootstrap-icons';

//a variable to contain possible game statuses
const gameStatus = ['in_progress', 'win', 'loss'];

function Display() {
    /**
     * here we define the state of this component
     * this state will also contain the controlling variables
     * of each of its child components
     * the state list is in the format: [ wordLettersList , previousLettersList, initialHangmanState, gameStatus ]
     * we use a set for the previous letters because we want these values to be distinct
     * when we set the state, we want to grab a random word from our dictionary and set it here
     */
    const [displayContent, setDisplayContent] = useState(() => {
        const word = dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();
        return [Array.from(word), new Set(), 0, gameStatus[0]];
    });

    //a function that can be called to check whether the user has won or lost
    const checkGameStatus = (tempDisplayContent) => {
        /**
         * if the hangman state is equal to 10, the user has lost
         * if the word array contains all of the letters from the 
         * previous letters array then the user has one
         */
        if (tempDisplayContent[2] === 10) {
            tempDisplayContent[3] = gameStatus[2];
        }
        else if (Array.from(tempDisplayContent[0]).every(letter => tempDisplayContent[1].has(letter))) {
            tempDisplayContent[3] = gameStatus[1];
        }

        return tempDisplayContent;
    }

    //a function that will handle all of the user's keyboard input
    const handleKeyDown = (event) => {
        /**
         * we want to take the key event and only add a capital 
         * letter version of the user's input if the input is a single letter
         */
        const keyPressed = event.key.toUpperCase();
        const tempDisplayContent = displayContent.slice();

        if (keyPressed.length === 1 && keyPressed.match(/[A-Z]|[-]/) && tempDisplayContent[3] === gameStatus[0]) {
            /**
             * we need to set the previous letters set to a new set to remove the reference
             * we can then safely record the keystroke
             */
            tempDisplayContent[1] = new Set(tempDisplayContent[1]);
            tempDisplayContent[1].add(keyPressed);

            /**
            * now that we know the keypress is only one letter,
            * we need to check if the letter was correct or not
            * if it was incorrect, we want to go to the next hangman state
            */
            if (!displayContent[0].includes(keyPressed) && !displayContent[1].has(keyPressed)) {
                tempDisplayContent[2] = tempDisplayContent[2] + 1;
            }
        }

        setDisplayContent(checkGameStatus(tempDisplayContent));
    };

    //a function that will check the current state and display the game status
    const infoHeader = () => {
        switch (displayContent[3]) {
            //in progress case
            case gameStatus[0]:
                return <h1>LIVES REMAINING: <span className={gameStatus[0]}>{10 - displayContent[2]}</span></h1>;
            //winning case
            case gameStatus[1]:
                return <h1 className={gameStatus[1]}>YOU WON!!!</h1>;
            //losing case
            case gameStatus[2]:
                return <h1 className={gameStatus[2]}>SORRY... YOU LOSE...</h1>;
            //invalid case
            default:
                return null;
        }
    }

    //a function that can be called to restart the game
    const restartGame = () => {
        window.location.reload(false);
    };

    /**
     * we need to create an event listener on the whole page
     * in order to do this, we will use the useEffect component so that we can create
     * the event listener as the component renders and then clean up the event listener
     * after the component is disposed of
     */
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    return (
        <div className='main-content'>
            <Button className='restart-btn' onClick={() => restartGame()}>Restart</Button>
            <OverlayTrigger
                placement='right'
                overlay={
                    <Popover>
                        <Popover.Header as="h3">Hangman Rules</Popover.Header>
                        <Popover.Body>
                            <li>A word will be randomly generated at the start of each game</li>
                            <li>A word can only contain letters and hyphens</li>
                            <li>You will start the game with 10 lives</li>
                            <li>In order to win, you must correctly guess each letter of the word before you run out of lives</li>
                            <li>You will lose a life for each incorrect guess</li>
                            <li>Each letter can only be guessed once throughout the game</li>
                            <li>Use your keyboard as your input device</li>
                        </Popover.Body>
                    </Popover>
                }
            >
                <span><QuestionCircle /></span>
            </OverlayTrigger>
            <Container>
                <div className='display-content'>
                    <Row>
                        {infoHeader()}
                    </Row>
                    <Row className='display-row'>
                        <Col className='spacer' />
                        <Col className='display-column'><PreviousLetters letters={Array.from(displayContent[1])} /></Col>
                        <Col className='display-column'><HangmanState state={displayContent[2]} /></Col>
                        <Col className='spacer' />
                    </Row>
                    <Row className='display-row'>
                        <Input wordLetters={displayContent[0]} previousLetters={Array.from(displayContent[1])} gameOver={displayContent[3] !== gameStatus[0]} />
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Display;