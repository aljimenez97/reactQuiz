import React from 'react';
import Counter from "./Counter";

export default class Navbar extends React.Component {
    render() {
        return (
            <div className={"navBar"}>
                <p className={"navBarTitle"}>{this.props.title}</p>
                <Counter time={this.props.time} />
            </div>
        );
    }
}
