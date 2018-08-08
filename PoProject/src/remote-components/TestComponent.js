import React from 'react';

const TestComponent = () => {
    const style = {
        borderStyle: "solid",
        borderWidth: "3px",
        borderRadius: "5px",
    }
    return (
        <span style={style} >
            Test Component
        </span>
    )
}

export default TestComponent