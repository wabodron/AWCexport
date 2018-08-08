import React, { Component } from 'react'
import BinocularsInput from './BinocularsInput';


// make connected components stateful components
export default class Email extends Component {
    render() {
        return(
            <div>
                <h3>Email</h3>
                <BinocularsInput type= 'EmailInput' searchCriteria={['ContactEmail']}/>
            </div>
        )
    }
}
