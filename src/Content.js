import React from 'react';
import Image from './Image';
import Question from './Question';
import Tips from "./Tips";
export default class Content extends React.Component {
    render() {
        return (
            <div className={"contentContainer"} style={{display: this.props.isFinished ? 'none' : 'flex'}}>
                <div className={"imageContainer"}>
                    <Image image={this.props.question.attachment.url}/>
                </div>
                <div className={"questionContainer"}>
                    <Question question={this.props.question.question}/>
                    <input type={"text"} value={this.props.question.userAnswer || ''} onChange={(e) => {
                        this.props.onQuestionAnswer(e.target.value);
                    }}/>
                    <Tips tips={this.props.tips}/>
                </div>
            </div>
        );
    }
}
