import React, { Component } from "react"
import { connect } from "react-redux"
import { search, hide } from 'actions'
import { Modal, Button } from "react-bootstrap";

class SearchBox extends Component {
    constructor(props) {
        super(props);
        const criteria = this.props.searchCriteria;
        // local state holds the criteria that we're going to search and the values of the user inputs. 
        // I held these variables here because its easiest to change values from inputs if they are here, and the criteria could potentially change while they are on the page.
        // state changes tell a component to rerender. 'see component lifecycle'

        this.state = {
            /* Object.assign makes an object with properties for each element in the criteria array. 
             * They are initially set to be empty strings
             * https://redux.js.org/recipes/using-object-spread-operator
             * array.prototype.map() is an ES6 higher order function that returns a new array with a defined function applied to all of its input array's entries.
             * this one returns an array of single key objects assigned to empty stings. 
             * the array is converted to an object with the the spread operator. also called 'rest parameters'
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
        // changes only the edited value in the state. the function cannot just set the value we want to change because the others will dissappear. 
        // its easiest to set all of them to what they were and the reset the one that changed.
        // Fun fact: when you set the same value twice in an object 
        //      definition the resulting object will have whatever is set last
        //      this is especially useful when designing reducers

        this.setState({ searchValues: { ...this.state.searchValues, [e.target.id]: e.target.value } })
    }

    handleSearch = () => {
        //passes the current state of the inputs to the store.        
        this.props.search(this.state.searchValues);
        // shows the Search Results Component by setting its visibility to true in the redux store.
        this.props.show(this.props.type);
        const criteria = this.props.searchCriteria;
        this.setState({
            searchValues: Object.assign(...criteria.map((criteria) => {
                return { [criteria]: '' }
            })
            ),
            searchCriteria: criteria
        })
        //this.props.hide("SearchBox")
    }

    render() {
        return <div>
            <Modal show={this.props.visibility} onHide={() => this.props.hide(this.props.type)}>
                {// this map function makes an input and a label for each element of the searchCriteria list, and connects it to the handleChange Method.
                 // JSX elements returned by map functions need unique keys. using indices is considered bad for some reason. (the map functions' callback function recieves the index as its second parameter)
                 // pressing enter in these fields doesn't cause a the handleSearch Method to fire because it is not a form. see CustomerInput.js for how to do this
                }
                <Modal.Header closeButton>
                    Search Criteria
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </Modal>
        </div>
        
    }
}

function mapStateToProps(state, ownProps) {
    // destructuring syntax.
    // the line below basically just sets name = ownProps.name. the whole line might be removed if on the line below we set visibility to state[ownProps.name]
    // I don't know why people use this. Its very easy and probably more readable to do it the normal way. Just showing that this exists.
    const {type} = ownProps;
    // state.name doesn't exist. the square brackets tell js to evaluate name before using it to select the part of state to use as visibility
    return { visibility: state[type].visi }
}

const mapDispatchToProps = {
    search,
    hide
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
