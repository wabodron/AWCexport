import BinocularsInput from './BinocularsInput'
import React, { Component } from 'react'

export default class EmailInput extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            value: ''
        }
    }

    render () {
        return <div>
            <h2>Email Input</h2>
            <BinocularsInput {...this.props} 
                criteria={['ContactEmail']} 
                display={this.props.account.ContactEmail} 
                verify = {(v) => v}
            />
        </div>
    }
}