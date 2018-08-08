import * as enzyme from 'enzyme';
import * as React from 'react';
import App from './App';

it('renders the correct text when no enthusiasm level is given', () => {
    const hello = enzyme.shallow(<App name='Daniel' />);
    expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
})

it('renders the correct text with and explicit enthusiasm of 1', ()=> {
    const hello = enzyme.shallow(<App name='Daniel' enthusiasmLevel={1} />);
    expect(hello.find(".greeting").text()).toEqual("Hello Daniel!")
})
it('renders the correct text with and explicit enthusiasm of 5', ()=> {
    const hello = enzyme.shallow(<App name='Daniel' enthusiasmLevel={5} />);
    expect(hello.find(".greeting").text()).toEqual("Hello Daniel!!!!!")
})

it('throws when the enthusiasm level is 0', () => {
    expect(() => {
        enzyme.shallow(<App name='Daniel' enthusiasmLevel={-1} />);
    }).toThrow();
})