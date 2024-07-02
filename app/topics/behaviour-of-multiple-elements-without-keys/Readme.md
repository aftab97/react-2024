# Behaviour of multiple Elements without Keys #

Lets take a look at this:
```
return (
    <Checkbox onChange={() => setIsTrue(!isTrue)}>
    {isTrue ? <Input id="abc" /> : <Input id="xyz" />}
)
```

Looks safe right? Wrong!

What is interesting about this if we take a look at the definition object
### Before ###
```
[
    {
        type: Checkbox
    },
    {
        type: Input
    },
]
```

### After ###
```
[
    {
        type: Checkbox
    },
    {
        type: Input //This will re-use and re-render
    },
]
```

So the problem is that React thinks the type hasn't changes which it hasn't it still references the same function ```<Input />```. So it does what React is taught to do which is re-render everything associated with, DOM element or state is still there. Which results in, you type somehting in the checkbox and then flip the checkbox and the new Input that is rendered still has the same Text.

This behaviour isn't necessarily bad but it this is a case where you rather have re-mounting rather then re-rendering.

## Fix ##
Arrays and Keys

### Fix 1 - Arrays ###
Take a look at this:
```
return (
    <Checkbox onChange={() => setIsTrue(!isTrue)}>
    {isTrue ? <Input id="abc" /> : null}
    {!isTrue ? <Input id="abc" /> : null}   
)
```

The object definition we get back will look like this:
```[{Checkbox}, {Item}, null]``` and if the boolean is true, ```[{Checkbox}, null, {Item}]```
The size of the array is the same so when React itterates over the array:
Gets to Checkbox -> re-render
Gets to Input -> unmount Input
Gets to null -> mount Input

### Fix 2 - Keys (dynamic array) ###
React knows in the definition object when the key is in parallel with the type. It acts like a uuid and tells React on rerender and to move the DOM nodes around.

The use of key:
```[{type: Input, key: 1}, {type: Input, key: 2}]```
with the key present when the Input gets changes around due to a user clicking some functionality which moves the Input (sort by latest, etc...). It changes to this:
```[{type: Input, key: 2}, {type: Input, key: 1}]```
React knows now on rerender I need to swap the input DOM nodes around and the text we typed into the first element will move into the second position.

As you can see Key does not prevent re-render! If you wish to prevent re-render you need to use ```React.memo```. You can use key with the array index or an id. Anything that is stable within re-renders.

With Memoisation:
using the key from an array can be a bad idea with dynamic arrays. For an input when the placeholder *prop* changes then React will re-render it as if memoisation does not exist.

*Using Array Key:*
```
[
    {type: Input, key: 1, placeholder: "a"}, 
    {type: Input, key: 2, placeholder: "b"}
]
```
and after reordering:
```
[
    {type: Input, key: 1, placeholder: "b"}, 
    {type: Input, key: 2, placeholder: "a"}
]
```

React itterates and reaches placeholder and see's that placeholder has changed from `"a"` to `"b"`. Which means even though it is memoised the prop has changed and will still `rerender`.