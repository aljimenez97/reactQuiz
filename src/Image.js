import React from 'react';
export default class Image extends React.Component {
    render() {
        return (
            <img src={this.props.image} alt={"Quiz description"}></img>
        );
    }
}
