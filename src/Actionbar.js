import React from 'react';
import Button from "./Button";
export default class Actionbar extends React.Component {
    render() {
        return (
            <div className={"actionBarContainer"} >
                <div className={"play"} style={{display: this.props.isFinished ? 'none' : 'flex'}}>
                    <Button isDisabled={false} clickFunction={this.props.onSubmit} buttonName={"SUBMIT"} buttonIcon={"check"}/>
                    <Button isDisabled={this.props.isFirstQuestion} clickFunction={this.props.onPreviousQuestion} buttonName={"PREVIOUS"} buttonIcon={"chevron_left"}/>
                    <Button isDisabled={this.props.isLastQuestion} clickFunction={this.props.onNextQuestion} buttonName={"NEXT"} buttonIcon={"chevron_right"}/>
                    <Button clickFunction={this.props.restart} buttonName={"RESET"} buttonIcon={"replay"}/>

                </div>

                <div className={"reset"} style={{display: this.props.isFinished ? 'flex' : 'none'}}>
                    <Button clickFunction={this.props.restart} buttonName={"PLAY AGAIN"} buttonIcon={"replay"}/>
                </div>

            </div>


        );
    }
}
