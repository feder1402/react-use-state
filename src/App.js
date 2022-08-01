import React from 'react';
import {render} from './index';

let states = []
let stateIndex = 0

const useState = initialValue => {
    const selfIndex = stateIndex

    states[selfIndex] ??= initialValue

    const setValue = newValue => {
        console.log('setVallue ', selfIndex, ' called with ', newValue)
        states[selfIndex] = newValue;
        stateIndex = 0
        render()
    }

    stateIndex++

    return [ states[selfIndex], setValue]
}

function Example() {
    const [count, setCount] = useState(0);
    const [countMeToo, setCountMeToo] = useState(0);

    return (
        <div>
            <p>You clicked me {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <p>You clicked me {countMeToo} times too</p>
            <button onClick={() => setCountMeToo(countMeToo + 1)}>
                Click me too!
            </button>
        </div>
    );
}

export default Example