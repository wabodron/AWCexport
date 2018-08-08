import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { FLAG, COLOR } from './actionTypes'

class Square extends Component {
    render() {
        const style={
            backgroundColor: this.props.colored ? '#000000' : '#FFFFFF'
        }
        return <td onClick={(e) => !e.getModifierState('Alt') ? this.props.color(this.props.row, this.props.col): this.props.flag(this.props.row, this.props.col)} 
            className='square' style= {style}>
            {this.props.flagged && <p style={{textAlign: 'center'}}>X</p>}

        </td>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        flag: (row, column) => dispatch({ type: FLAG, row: row, column: column }),
        color: (row, column) => dispatch({ type: COLOR, row: row, column: column })

    }
}

function mapStateToProps(state, ownProps) {
    return { 
        colored: state[5*ownProps.row+ownProps.col].colored, 
        flagged: state[5*ownProps.row+ownProps.col].flagged
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);