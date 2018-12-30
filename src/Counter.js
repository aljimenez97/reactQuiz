import React from 'react';
export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.modifyCounter = this.modifyCounter.bind(this);
    }

    modifyCounter(){
        this.props.count();
    }

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

