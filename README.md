This repository illustrates how React's useState could be implemented. The purpose is to illustrate how the real useState works and why to help developers get the correct mental model

The rest of this document contains my “speaker notes” for a presentation during the Front-End Dev Guild monthly meeting. 

I wrote these notes as part of my preparation for the presentation. I’m sharing them in case someone finds them useful, but I haven’t edited them in any way to make them more readable.

# Speaker Notes
## What we will talk about today
With the introduction of hooks in version 16.8, React introduced a nicer-looking and cleaner mechanism to handle state and side effects using functional components instead of classes  
Although I strongly believe hooks are usually overused as it is a best practice to separate the View from the application logic, that is a topic for another time. Today, I would like to talk about useState and specially, discuss how it works internally  
The goal is not to get into all the details and intricacies of the actual implementation but to develop a mental model for the overall mechanism React uses to make useState works  
This is crucial as, unfortunately, we need to know to a certain level how React works as having the wrong model causes us to misunderstand how React works and therefore introduce bugs.

## Our approach to develop a mental model for how useState works
One way to understand how a software feature works is to go over the code - i.e., looking at the solution. This is certainly a good and valid approach that can give us a deep and detailed understanding of how it works.
However, today I'll like to take an alternative approach and focus instead on implementing useState from scratch and come up with our own solutions instead of studying an existing one. This would help us get a better perspective on the issues and constraints the React faced during their implementation so we can better understand why they did things the way they did it  

This would us help to understand why, for example:  
•	React has the rules it has for hooks (see Rules of Hooks).
•	Changes in the state don't happen immediately  

The goal, again, is not a complete understanding of the implementation but to create the correct mental model for how useState works that would allow to use it effectively and without bugs  

Our goal is not a complete and optimal implementation but something simple enough to be done quickly but also realistic enough to expose us to the constrains and decisions the React team encountered while implementing useState.

If you find this approach useful, then we can try to do the same for other hooks, such as useEffect, or for other critical React features such as re-renders, component lifecycle, etc.

## Target sample React app that uses useState
I'll use the example React's documentation uses to introduce hooks at as sample code that uses useState. 
Our goal is to be able to run the sample code with our implementation of useState as if it would run if it were using the original one.
Let me copy and paste the [code on React’s example](https://reactjs.org/docs/hooks-intro.html) to my editor

```js
import React, { useState } from 'react';

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
```
If I run it, I see the value of the counter and a button to increment it

![](./docs/screen1.png)

If we click on the button, the value increases by one

![](docs/screen2.png)

This is working as expected. Now we want to do the same with our version…

## Let’s pretend useState does not exist (yet)
Suppose useState is not something React provided,
maybe because we are still using an older version that doesn’t support hooks so we cannot import useState from React.

```js
import React from 'react';

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
```
If we remove useState from the import and try to compile, we get an error:

![](docs/error.png)

## Fixing the compile error
Let's fix it by creating a skeleton useState function that:
-	takes an initial value (or function, but we will ignore this for now)
-	returns an array containing the current value and a function to set a new value

```js
const useState = initialValue => {
    const setValue = (newValue) => 
           console.log('setValue called with', newValue) 
    
    return [initialValue, setValue]
}
```
If we run it, we see that the page renders with the counter and button and there is no error; furthermore, 
if we click on the button, we can see the notification in the console - but the value doesn't increment this time...

## Making it tick

