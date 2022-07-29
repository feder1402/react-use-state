import React from 'react';

const useState = initialValue => {
    const setValue = (newValue) => console.log('setValue called with', newValue) 
    
    return [initialValue, setValue]
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