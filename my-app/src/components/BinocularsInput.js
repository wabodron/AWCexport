import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setValue, show } from 'actions'
import SearchBox from './CustomerSearchBox'
import { Button, Form, ControlLabel } from 'react-bootstrap'

class CustomerInput extends Component {
    constructor() {
        // super() is a required function if you define a constuctor.
        super();
        
        this.handleSubmit = this.handleSubmit.bind(this);
        // local component state might be defined here if i wasn't using redux to handle state.
        
    }

    handleSubmit(event) {
        event.preventDefault();
        /* it is a good habit to add event.preventDefault to all your reusable events. 
         * since the JSX element that calls this is a form onSubmit, normally the page would reload, but this 'prevents the default' *
         * the [event] parameter is an object created by the onSubmit event that contains information about what happened. I'd recommend console logging the whole thing or just the 'event.target.value' part
         */

        this.props.show(this.props.type);
    }  

    render() {
        return <div>
            <Form inline validationState={this.state.validationState} onSubmit={this.handleSubmit} 
                /* weird stuff happens when you want to use a class function as an event method. we need to "bind the this." dunno why. maybe you can figure it out
                 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
                 * I actually did the binding on line 9
                 */
                >
                <FormGroup>
                    <FormControl 
                        type="text"
                        value={this.props.value}
                        onChange={(event) => {
                            /* on Change dispatch SETVALUE action. this component has access to the function because it is 
                            * a 'connected component' with setValue defined in its mapDispatch to props
                            */
                            this.props.setValue( event.target.value );

                            console.log(event.target.value);
                            }
                        }
                    />
                    <FormControl.Feedback />
                    <Button bsStyle="primary" type='submit'>Binoculars</Button>
                    <SearchBox 
                        {...this.props}
                    />
                </FormGroup>
            </Form>
            
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    return { value: state[ownProps.type].value }
}

const mapDispatchToProps = {
    setValue,
    show
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInput)