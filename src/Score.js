import React from 'react';
export default class Score extends React.Component {
    render() {
        return (
            <div className={"scoreContainer"} style={{display: this.props.isFinished ? 'flex' : 'none'}}>
                <div className={"scoreNum"}>
                    Su puntuación es: {this.props.score}
                </div>
            </div>
        );
    }
}
