import React, { Component } from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'

class AccountView extends Component {
    render() {
        const propNames = Object.getOwnPropertyNames(this.props.account)
        console.log(propNames)
        const columns = propNames.map((propName) => {
            return {Header: propName, accessor: propName}
        })
        return <ReactTable
            data = {[this.props.account]}
            columns={columns}
            showPagination= {false}
            minRows={1}
            noDataText= "No Account Selected"
            />
    }
}

const mapStateToProps = (state) => {
    console.log(state.Search.account)
    return {account: state.Search.account}
}

export default connect(mapStateToProps)(AccountView)