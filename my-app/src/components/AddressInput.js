import BinococularsInput from './BinocularsInput'
import React from 'react'

export default class AddressInput extends React.Component {
    render () {        
        return <div>
            <h3>Address</h3>
            <BinococularsInput type='AddressInput' searchCriteria={["BillToAddress1"]} />
        </div>
    }
}