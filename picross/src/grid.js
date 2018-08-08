import React, { Component } from 'react'
import Square from './square'

export default class Grid extends Component {
    render() {
        const { data } = this.props
        let string = data.map((datum) => {
            let str = '';
            for (var i of datum) {
                str = str.concat(i);
            }
            return str;
        })
        let horizontal = data[0].map((col, i) => data.map(row => row[i]));
        horizontal = horizontal.map((datum) => {
            let str = '';
            for (var i of datum) {
                str = str.concat(i);
            }
            return str;
        })
        const vertical = string.map((str) => str.split(/0+/).filter((str) => !str.search(/1/)).map((str) => str.length));
        horizontal = horizontal.map((str) => str.split(/0+/).filter((str) => !str.search(/1/)).map((str) => str.length));

        return <div>
            <table border='1' style={{float: "left"}}>
                <tbody>
                    <tr><td className='square'></td></tr>
                    {vertical.map((row) => <tr><td className='square'>{row.map((o) => <span>{o}  </span>)}</td></tr>)}
                </tbody>
            </table>

            <table border='1'>
                <thead>
                    {horizontal.map((column, i) => <th className="square">{column.map((o, j) => <span  key={j}>{o} </span>)}</th>)}
                </thead>
                <tbody>
                    {data.map((row, row_n) => {
                        return <tr row={row_n} key={row_n}>{row.map((pixel, col_n) => {
                            return <Square pixel={pixel} row={row_n} col={col_n} key={col_n.toString() + row_n.toString()} />
                        })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    }
}