import React, { Component } from "react";
// neat table api I found
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Modal } from "react-bootstrap";


export default class SearchResults extends Component {

    constructor () {
        super();

        this.state = {
            results: ''
        };
        this.search();
    }
    
    componentWillReceiveProps() {
        this.search();
    }

    search() {
        try {
            fetch("https://nettest2api.awc-inc.com/customer/where/4CM4-316")
                .then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    const {searchField} = this.props;
                    console.log(myJson[0])
                    
                    const results = myJson.filter(value => {
                        return Object.getOwnPropertyNames(searchField).every((searchValue) => value[searchValue].startsWith(searchField[searchValue]))
                    });
                    this.setState({results: results})
                })
        } catch (err) {                
            this.setState({results: err});
        }
    }

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
        const modalStyle = {
            position: 'absolute',
            top: 200

            };
        return <Modal backdrop={true} enforceFocus={false} style={modalStyle} show={this.props.visibility} onHide={() => this.props.hideResults()}>
            <Modal.Header closeButton>
                <Modal.Title>SearchResults</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactTable 
                    // this table might get wacky if there were a bunch of elements. because my fetch can only ever return six it looks nice
                    // once I got a bigger list of customers i would need to implement pagination and fetch data based on page size. the search would happen server side.
                    // documentation for <ReactTable /> https://react-table.js.org/#/story/readme

                    data={this.state.results}  //required
                    columns={columns} //required
                    className="-striped -highlight"
                    defaultPageSize={10}
                    //style={{ height: "400px" }}
                    showPagination={false}
                    minRows={1}
                    // min rows gets rid of white cells below the last entry.
                    // dont set it to zero. default is the same as defaultPageSize because everyone wants to use Pagination 
                    noDataText="No Results Found"
                    contentEditable
                    suppressContentEditableWarning
                    getTdProps={(state, rowInfo)=> {
                        return {
                            onClick: () => {
                                this.props.setAccount(rowInfo.original)
                                this.props.hideSearch();
                                this.props.hideResults();
                                this.props.setInput(rowInfo.original.AccountCode)
                                
                            }
                        };
                    }}
                />
            </Modal.Body>
        </Modal>
    }
}