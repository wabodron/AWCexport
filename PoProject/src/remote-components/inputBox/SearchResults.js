import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            customers: {},
            results: []
        };
        fetch("https://nettest2api.awc-inc.com/customer/where/4CM4-316")
            .then(function(response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ customers: myJson });
                console.log(myJson)
            })
    }

    render() {
        const search = this.props.searchField;
        
        const customers = Object.values(this.state.customers);
        
        const results = customers.filter(value => {
            return (
                Object.getOwnPropertyNames(search).map((searchValue) => value[searchValue].startsWith(search[searchValue])).every((c) => c)
            )
        });
        return <div>
            <SearchResults Results={results} {...this.props} />
        </div>

    }
}

function mapStateToProps(state, ownProps) {
    return {
        searchField: state[`SmartInputBox${ownProps.name}`].searchField
    };
}

const connectedComponent = connect(mapStateToProps)(Search)

export default connectedComponent

class SearchResults extends Component {
    render() {
        let columns = [
            {
                Header: "Account Code",
                accessor: "AccountCode"
            },
            {
                Header: "Bill To",
                accessor: "BillToCity"
            },
            {
                Header: "Ship To",
                accessor: "ShipToAddress1"
            },
            {
                Header: "Email",
                accessor: "ContactEmail"
            }
        ]       
        return <div className="CustomerSearchBox">
            {this.props.Results === undefined && <p>Oops! No results</p>}
            <ReactTable 
                data={this.props.Results}
                columns={columns}
                className="-striped -highlight"
                defaultPageSize={10}
                style={{ height: "400px" }}
                showPagination={false}
                minRows={1}
                noDataText="No Results Found"
                contentEditable
                suppressContentEditableWarning
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {
                            this.props.setValue(rowInfo.original.AccountCode);
                            this.props.hide("SearchResults");
                            this.props.hide("SearchBox");
                            
                        }
                    };
                }}
            />
            </div>

    }
}

function setValue(value, name) {
    return { type: "SETVALUE", value: value, name: name };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setValue: function (value) {
            return dispatch(setValue(value, ownProps.name));
        }
    }
}

SearchResults = connect(null, mapDispatchToProps)(SearchResults)