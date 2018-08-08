import React, { Component } from "react";
import { connect } from "react-redux";
// neat table api I found
import ReactTable from "react-table";
import "react-table/react-table.css";
import { setValue, setEmail, setAddress, setAccount, hide } from 'actions'
import { Modal } from "react-bootstrap";


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
        return <Modal show={this.props.visi} onHide={() => this.props.hide()}>
            <Modal.Header closeButton>
                <Modal.Title>SearchResults</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactTable 
                    // this table might get wacky if there were a bunch of elements. because my fetch can only ever return six it looks nice
                    // once I got a bigger list of customers i would need to implement pagination and fetch data based on page size. the search would happen server side.
                    // documentation for <ReactTable /> https://react-table.js.org/#/story/readme

                    data={this.props.results}  //required
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
                                this.props.setValue(rowInfo.original.AccountCode);
                                this.props.setEmail(rowInfo.original.ContactEmail);
                                this.props.setAddress(rowInfo.original.BillToAddress1)
                                this.props.setAccount(rowInfo.original)
                                this.props.hide("Search");
                                
                            }
                        };
                    }}
                />
            </Modal.Body>
        </Modal>
    }
}

function mapStateToProps(state) {
   return { results: state.Search.results, visi: state.Search.visi }
}

const mapDispatchToProps = {
    setValue,
    setEmail,
    setAddress,
    setAccount,
    hide
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)