import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";

class CustomerSearchBox extends Component {
    constructor(props) {
        super(props);
        const criteria = this.props.searchCriteria;
        this.state = {
            /*Object.assign makes an object with properties for each element in the criteria array. 
             They are initially set to be empty strings
             https://redux.js.org/recipes/using-object-spread-operator
             */
            searchValues: Object.assign(...criteria.map((criteria) => {
                return { [criteria]: '' }
            })
            ),
            searchCriteria: criteria
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (e) => {
        //changes only the edited value in the state. 
        //Fun fact!: when you set the same value twice in an object 
        //      definition the resulting object will have whatever is set last

        this.setState({ searchValues: { ...this.state.searchValues, [e.target.id]: e.target.value } })
        console.log({ ...this.state.searchValues, [e.target.id]: e.target.value })
    }

    handleSearch = () => {
        this.props.search(this.state.searchValues);
        this.props.show("SearchResults");
        //this.props.hide("SearchBox")
    }

    render() {
        const styles = {
            margin: '20px',
            padding: '5px',
            backgroundColor: 'lightgrey',
        }
        return <div style={styles}>
            {this.state.searchCriteria.map((value) => {
                return <div key={value}>
                        {value}: 
                        <input id={value} onChange={this.handleChange} />
                    </div>
                })
            }
            <Button bsStyle="primary" onClick={this.handleSearch} >
                Search
            </Button>
            </div>
    }
}

function search(value, name) {
    return { type: "SEARCH", field: value, name: name };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        search: function (field) {
            return dispatch(search(field, ownProps.name));
        }
    }
}

var SearchBox = connect(null, mapDispatchToProps)(CustomerSearchBox);

export default SearchBox
