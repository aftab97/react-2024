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

Considering the above, there is only one scenario, when memoizing props on a component makes sense: ``` when every single prop and the component itself are memoized. ``` Everything else is just a waste of memory and unnecessarily complicates your code.


## *Expensive calculation??* ##
The primary goal of useMemo, according to React docs, is to avoid expensive calculations on every render. No hints though of what constitutes the “expensive” calculation. As a result, developers sometimes wrap in useMemo pretty much every calculation in the render function. Create a new date? Filter, map or sort an array? Create an object? useMemo for all!

Example:
Lets take a look at this example. This looks like this might be a expensive calculation lets record the time it with memoising the value and without.
```
const List = ({ countries }) => {
  const before = performance.now();

  const sortedCountries = orderBy(countries, 'name', sort);

  // this is the number we're after
  const after = performance.now() - before;

  return (
    // same
  )
};
```

Result?
With memoisation: 20 milliseconds
Without memoisation: 2 milliseconds

Why?
memoization doesn’t come for free. If we’re using useMemo, during the initial render React needs to cache the result value - that takes time. Yes, it will be tiny, in our app above memoizing those sorted countries takes less than a millisecond. But! This will be the true compound effect. The initial render happens when your app first appears on the screen. Every component that is supposed to show up goes through it. In a big app with hundreds of components, even if a third of those memoize something, that could result in 10, 20, at worst maybe even 100 milliseconds added to the initial render.