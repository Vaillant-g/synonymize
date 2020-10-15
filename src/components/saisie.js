import React, { Component } from 'react';

class Saisie extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.saveInput(e.target.value);
    }
    render() {
        return (
            <div>
                <textarea name="saisie" onChange={this.handleChange} />
            </div>
        )
    }
}

export default Saisie;