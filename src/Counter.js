import React from 'react';
export default class Counter extends React.Component {


    render() {
        return (
            <div className={"timerContainer"}>
                {this.props.time > 0 ?
                    (<div className={"timerNum"}>
                        <p style={{color: (this.props.time <=10) ? 'red' : 'white' }}> Tiempo restante: {this.props.time} </p>
                    </div>) :
                    <div className={"noTime"}> <p>Se acabó el tiempo</p></div>
                }

            </div>
        );
    }
}

