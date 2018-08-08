import BinococularsInput from './BinocularsInput'
import React from 'react'

export default class CustomerInput extends React.Component {
    render () {        
        return <div>
            <h3>AccountCode</h3>
            <BinococularsInput type='CustomerInput' searchCriteria={["AccountCode", "ShipToCity", "APContactName"]} />
        </div>
    }
}