import React from 'react';
export default class Question extends React.Component {
    render() {
        return (
            <div className={"questionDiv"}>{this.props.question}</div>
        );
    }
}
