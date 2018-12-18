import React from 'react';
export default class Navbar extends React.Component {
    render() {
        return (
            <div className={"navBar"}>{this.props.title}</div>
        );
    }
}
