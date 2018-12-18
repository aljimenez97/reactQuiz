import React from 'react';
export default class Tips extends React.Component {
    render() {
        return (
            <div className={"tipsContainer"}>
                <h3 className={"tipsTitle"}>Tips</h3>
                    {
                        this.props.tips.length === 0 ?
                            (<div className={"noTips"}> Esta pregunta no tiene pistas</div>) :

                            (
                                <ul>
                                    {
                                        this.props.tips.map((tip, index) => {
                                            return <li key= {index}>{tip}</li>
                                        })
                                    }
                                </ul>
                            )
                    }
            </div>
        );
    }
}
