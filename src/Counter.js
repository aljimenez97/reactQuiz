import React from 'react';
export default class Counter extends React.Component {


    render() {
        return (
            <div className={"timerContainer"}>
                {this.props.time > 0 ?
                    (<div className={"timerNum"}>
                        Tiempo restante: {this.props.time}
                    </div>) :
                    <div className={"noTime"}> Se acabó el tiempo</div>
                }

            </div>
        );
    }
}

