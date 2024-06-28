# Creating a component inside of another component #

Take a look at this:
```
const Component = () =>{
    const Input = () => <input />;

    return Input;
}
```

The definition object looks like this:
```
{
    type: Input,
    ...
}
```

The problem with this is that the component is local to it and will be recreated on every re-render. 

We know this is a problem because in React we use Shallow Comparisons:
```
const a = () => {};
const b = () => {};

a === b //FALSE!
```

Another problem it will be hard to trace bugs as the state previously to that component will be destroyed on re-render.
