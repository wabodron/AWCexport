import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"
import Results from './SearchResults'

export default class Search extends Component {
    constructor(props) {
        super(props);
        const criteria = this.props.criteria;
        this.state = {
            searchValues: Object.assign(...criteria.map((criteria) => {
                return { [criteria]: '' }
            })
            ),
            searchCriteria: criteria,
            child: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (e) => {
        this.setState({ searchValues: { ...this.state.searchValues, [e.target.id]: e.target.value } })
    }

    handleSearch = () => {
        const criteria = this.props.criteria;
        this.setState({
            searchCriteria: criteria,
            child: true
        })       
    }

    hide = () => {
        this.setState({ child: false 
        ,searchValues: Object.assign(...this.props.criteria.map((criteria) => {
            return { [criteria]: '' }
        })
        )})
    }

    render() {

        
        return <div>
            <Modal show={this.props.visibility} onHide={(e) => this.props.hideSearch()}>
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
            <Results {...this.props} 
                visibility= {this.state.child} 
                hideResults = {this.hide} 
                searchField = {this.state.searchValues}
            />
        </div>
        
    }
}