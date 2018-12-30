import React from 'react';
export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.clickFunction = this.clickFunction.bind(this);
    }

    clickFunction(){
        this.props.clickFunction();
    }

    render() {
        return (
            <button onClick={this.clickFunction} disabled={this.props.isDisabled}
                    style={{cursor: this.props.isDisabled ? 'not-allowed' : 'pointer'}}>
                <span className={"material-icons"}>
                    {this.props.buttonIcon}
                </span>
                {this.props.buttonName}
            </button>
        );
    }
}
