import * as React from 'react';

interface IPokeApiState {
    data: any;
    url: string;
    visibility: boolean;
}

type State = Readonly<IPokeApiState>

export default class PokeApi extends React.Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = { 
            data: [{}],
            url: "https://pokeapi.co/api/v2/",
            visibility: true,
        }
        fetch(this.state.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({data})
        })
    }

    public handleClick = (url:string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.setState({url});
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({data})
        })
    }

    public renderShallow = (iterable: any) => {
        if (Array.isArray(iterable)) {
            iterable.map((item) => this.renderShallow(item))
            return(null)
        } else {
            const propNames = Object.getOwnPropertyNames(iterable);
            return(
                <ul>
                {propNames.map((propName:string, key:number) => {
                    if (Array.isArray(iterable[propName])) {
                        this.renderShallow(iterable[propName])
                    }
                    // tslint:disable-next-line:no-unused-expression
                    <li key={key}>
                        {propName}:
                        {iterable[propName].startsWith('http') &&
                            <a 
                                href='#'
                                onClick={ this.handleClick.bind(this, iterable[propName])}
                            >{iterable[propName]}</a>
                        }
                        {!iterable[propName].startsWith('http') && iterable[propName]}
                    </li>})}
                </ul>)
        }
    }


    public render() {
        return (
            this.renderShallow(this.state.data)
        )
    }
}