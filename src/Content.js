import React from 'react';
import Image from './Image';
import Question from './Question';
import Tips from "./Tips";
export default class Content extends React.Component {
    componentDidMount(){
        document.getElementById("answerInput").focus();
    }
    componentWillUpdate(){
        document.getElementById("answerInput").focus();
    }
    render() {
        return (
            <div className={"contentContainer"} style={{display: this.props.isFinished ? 'none' : 'flex'}}>
                <div className={"imageContainer"}>
                    <Image image={this.props.question.attachment.url}/>
                </div>
                <div className={"questionContainer"}>
                    <Question question={this.props.question.question}/>
                    <input id={"answerInput"} placeholder={"Write your answer here..."}
                        type={"text"} value={this.props.question.userAnswer || ''}
                        onChange={(e) => {
                        this.props.onQuestionAnswer(e.target.value);
                    }}/>
                    <Tips tips={this.props.tips}/>
                </div>
            </div>
        );
    }
}
