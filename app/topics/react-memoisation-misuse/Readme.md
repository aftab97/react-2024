# React Memoisation Misuse #

Often this complex topic gets misunderstood and misued due to vague terms e.g. ``` Expensive calculation ```. 
Lets explore some of the misuses:


### Example 1: ###
Common misconception here is that user would believe because the function being passed is memoised that means
the Page component gets memoised too. ``` Wrong! ```
```
const MyComponent = () =>{
  
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log('Do something on click');
  };

  return (
    // page will re-render regardless of whether onClick is memoized or not
    <Page onClick={onClick} />
  );
}

```

### Example 2: ###
Another misconception. The child is memoised so technically the Component should be memoised too? ``` Wrong! ```
```
const PageMemoized = React.memo(Page);

const App = () => {
  
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log('Do something on click');
  };

  return (
    // PageMemoized WILL re-render because onClick is not memoized
    <PageMemoized onClick={onClick} />
  );
};
```

### Example 3: ###
Here we have another common misconception since partly some of the props are memoised and others are not Page memoised will re-render itself.
```
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = useCallback(() => {
    console.log('Do something on click');
  }, []);

  return (
    // page WILL re-render because value is not memoized
    <PageMemoized onClick={onClick} value={[1, 2, 3]} />
  );
};
```