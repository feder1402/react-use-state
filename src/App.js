import React from 'react';

let state

const useState = initialValue => {
    state ??= initialValue

    const setValue = newValue => {
        console.log('setVallue called with ', newValue)
        state = newValue;
    }

    return [state, setValue]
}

function Example() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default Example