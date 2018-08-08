import React, { Component } from 'react'
import Search from './Search'

//import SearchBox from './CustomerSearchBox'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap'

export default class CustomerInput extends Component {
    constructor() {
        // super() is a required function if you define a constuctor.
        super();
        this.state = {
            input: '',
            child: false,
            
        }
        // local component state might be defined here if i wasn't using redux to handle state.

    }

    componentWillReceiveProps(newProps) {
        if(newProps.display !== this.props.display) {
            console.log(newProps.display)
            this.setState({ input: newProps.display })
        }
    }

    setInput = (value) => this.setState({ input: value })

    hide = () => {
        this.setState({ child: false})
    }

    handleSubmit(event) {
        event.preventDefault();        
        this.setState({ child: true })
    }

    handleBlur(event) {
        this.setState({
            validationState: this.props.verify(event.target.value),
            
            input: event.target.value
        });
        console.log(this.props.verify(event.target.value)) 
    }

    render() {
        return <div>
            <Form inline onSubmit={(e) => this.handleSubmit(e)} >
                <FormGroup validationState={this.state.validationState}>
                    <FormControl
                        type="text"
                        value= {this.state.input}
                        onBlur={(e) => this.handleBlur(e)}
                        onChange = {(e) => this.setState({ input: e.target.value})}
                    />
                    <Button bsStyle="primary" type='submit'>Binoculars</Button>
                </FormGroup>
                <Search 
                    {...this.props}
                    visibility={this.state.child} 
                    hideSearch={this.hide} 
                    setInput={this.setInput}
                />
                <FormControl.Feedback />
            </Form>

        </div>
    }
}