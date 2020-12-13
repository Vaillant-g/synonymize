import React, { Component } from 'react';

class Resultat extends Component {
    render() {
        return (
            <div className="result">
                <span >
                    {this.props.text}
                </span>
            </div>
        )
    }
}

export default Resultat;