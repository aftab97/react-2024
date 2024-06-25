# Misconception about Props #
One common misconception about props is that people believe that because states cause re-renders then so should Props. However that is not the case. Lets see why?

A component is just a function that returns an Element. That is the main difference between a component and a function. An Element is simply an object that defines a component that needs to be rendered on the screen. JSX syntaxt is nothing more then just syntax-sugar for ``` React.createElement(Child, null, null) ```


This creates a Object definition that looks like this:
```
{
    type: Child,
    props: {},
    .... //other internal stuff

}
```

Elements and not limited to components; they can be just normal ODM elements. Our Child could return and h1 tag for example:
```
const Child = () =>{
    return <h1>Some title</h1>
};
```
this gets converted to:
```
{
    type: "h1",
    ... //props etc...
}
```

React will now build a tree of these objects from the returns of these functinos which we call ```Fiber Tree``` or ```Virutal Dom```. Now what occurs is that if the object before and after re-render are the is exactly the same React will skip rerender using ```Object.is(ElementBeforeRenrender, ElementAfterRerener)```. React does not use deep comparision of objects.

Keep this in mind:
```
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true
```

Lets have a look at this scenario:
```
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log('Do something on click');
  };
  return (
    // PageMemoized WILL re-render because onClick is not memoized remeber this is not passes as a prop or child (different behaviour)
    <PageMemoized onClick={onClick} />
  );
};
```
Because onClick is local to the component it is recreated on every render therefore Object.is() shallow comparision will fail and rerender.

## The Children / Prop scenario ##
Passing child as a prrop:
```
const Parent = ({child}) =>{
    const [state, setState] = useState();

    return child; //This will not rerender!
}

used as:
<Parent child={<Child />} />

or:

<Parent>
    <Child />
</Parent>
```

This means when React will compare that the Parent function returns "before and "after" state change. In this case it will be a reference to ```<Child/>```. In which case is it created outside of the Parent function scope. As a result, the comparision will equal true and will not rerender.

The comparision will look like this:
{
    type: Parent,
    props: {
        children: [{type: Child, props: {}, ...}] <- This will reference the same Object in memory hence no rerender
    }
}

### Furthermore: ###
If dont pass the Child as a props e.g.:
```
const Parent = () =>{
    const child = <Child /> //This is always recreated on every render

    return <div>{child}</div>; //hence this will always rerender
}
```

How the Object definition will look:
```
{
    type: ...
    props: {
        children: {}
    }
}
```

### What to take away from this? ###
Children passed as props will not rerender.
