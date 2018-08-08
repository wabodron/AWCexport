import React, { Component } from 'react'
import { CustomerByEmail } from './CustomerByEmail'
import { CustomerInput } from './CustomerInput'
import TestComponent from '../remote-components/TestComponent';

// import { R } from 'ramda'

export class App extends Component {
    constructor() {
        super()
    }

    render() {

        return (
            <div style={{ margin: "40px" }}>
                <CustomerByEmail name="A" type='customer' value="george"/><br />
            </div>
        )
    }
}