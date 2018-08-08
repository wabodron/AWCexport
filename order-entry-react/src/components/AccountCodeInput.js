import React, { Component } from 'react'
import BinocularsInput from './BinocularsInput'

export default class AccountCodeInput extends Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        this.state = {
            accountCode: this.props.account.AccountCode,
            validationState: 'warning'
        }
    }

    verify = (value) => {
        fetch("https://nettest2api.awc-inc.com/customer/where/4CM4-316") 
        .then(function(response) {
            return response.json();
        })
        .then((myJson) => {
            const AccountCodes = myJson.map((account) => {
                return account.AccountCode;
            })
            console.log(AccountCodes)
            value = value.trim()
            for (let i = 0; i <= myJson.length; i++) {
                if (i === myJson.length) {
                    console.log('account not found')
                    this.props.setAccount('')
                    this.setState({ validationState: 'error' })
                    break;
                }
                if (RegExp('^'+ value +'$', 'i').test(AccountCodes[i].trim())) {
                    this.setState({accountCode: value});
                    this.props.setAccount(myJson[i])
                    this.setState({ validationState: 'success' })
                } 
            }
        })

    }

    render () {
        return <div>
            <h2>AccountCode</h2>
            <BinocularsInput {...this.props} display={this.props.account.AccountCode} verify={this.verify} criteria={["AccountCode", "ShipToCity", "APContactName"]}/>
        </div>
    }

}