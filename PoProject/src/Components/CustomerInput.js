import React, { Component } from "react";
import SearchBox from "./CustomerSearchBox";
import SearchResults from "./SearchResults";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

class VerificationBox extends Component {
    constructor() {
        super();
    }
    
    handleSubmit = () => {
        this.props.show("SearchBox");
        this.props.searchCriteria(this.props.type);
        //types handled in the reducer. can be 'customer'
    }

    render() {
        return <div>
            <div className="CustomerAcctBox">
                <input onChange={(e) => this.props.setValue(e.target.value)
                } className="CustomerAcctInput" value={this.props.value}></input>
                <Button bsStyle="primary" onClick={this.handleSubmit} >
                    <img src={require('./binoculars.gif')} alt="Binoculars" />
                </Button>
            </div>
        </div>
            
    }
};

function mapStatetoProps(state, ownProps) {
    return {
        value: state[`CustomerInput${ownProps.name}`].value
    };
}

function setValue(value, name) {
    return { type: "SETVALUE", value: value, name: name};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setValue: function (value) {
            return dispatch(setValue(value, ownProps.name));
        }
    }
}

let CustomerAcctBox = connect(mapStatetoProps, mapDispatchToProps)(VerificationBox)

function setCriteria(value, name) {
    return { type: "SETCRITERIA", criteria: value, name: name };
}

function mapDispatchtoProps(dispatch, ownProps) {
    return {
        searchCriteria: function (criteria) {
            return dispatch(setCriteria(criteria, ownProps.name));
        }
    }
}

var CriteriaBox = connect(null, mapDispatchtoProps)(CustomerAcctBox);

export class CustomerInput extends Component {  
    //need only to define the type prop. options are in the reducer
    constructor() {
        super();
        this.handleClick = this.handleClickS.bind(this);
        this.handleClick = this.handleClickH.bind(this);
    }

    handleClickS = (e) => {
        e.preventDefault();
        this.props.show("AcctBox");
        this.props.show("SearchBox");
    }
    handleClickH = (e) => {
        e.preventDefault();
        this.props.hide("AcctBox");
        this.props.hide("SearchBox");
    }

    render() {
        return <div>
            {this.props.visibilities.AcctBox && <CriteriaBox {...this.props} searchCriteria={["BillToName", "AccountCode", "ShipToCity"]} />}
            <Modal show={this.props.visibilities.SearchBox} onHide={() => this.props.hide("SearchBox")}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Box</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchBox {...this.props} />
                </Modal.Body>
            </Modal>
            <Modal show={this.props.visibilities.SearchResults} onHide={() => this.props.hide("SearchResults")}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <SearchResults {...this.props} />
            </Modal>
        </div>
    };
}

function mapStateToProps(state, ownProps) {
    return {
        visibilities: state[`CustomerByEmail${ownProps.name}`].visibilities
    };
}

// Redux Actions
function show(value, name) {
    return { type: "SHOW", component: value, name: name };
}

function hide(value, name) {
    return { type: "HIDE", component: value, name: name };
}

//Map Redux action to Component props
function mapDispatchToPropsH(dispatch, ownProps) {
    return {
        hide: function (component) {
            return dispatch(hide(component, ownProps.name));
        },
        show: function (component) {
            return dispatch(show(component, ownProps.name));
        }
    }
}

//The HOC
export default connect(mapStateToProps, mapDispatchToPropsH)(CustomerInput)