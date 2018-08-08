import * as React from "react";
// neat table api I found
import ReactTable from "react-table";
import "react-table/react-table.css";


interface IResultsProps {
    searchField: string[];    
    setAccount: (account: Object[]) => void;
    hideSearch: () => void;
    hideResults: () => void;
    setInput: (input: string) => void;
    
}

interface IjSon {
    AccountCode: string;
}

interface IrowInfo {
    original: IjSon;
}

interface IResultsState {
    results: Object[];
}

export default class SearchResults extends React.Component<IResultsProps, IResultsState> {

    constructor(props: IResultsProps) {
        super(props);

        this.state = {
            results: [{}]
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
                .then((myJson: Object[]) => {
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
        return <ReactTable 
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
                    getTdProps={(state: Object[], rowInfo: IrowInfo)=> {
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
    }
}