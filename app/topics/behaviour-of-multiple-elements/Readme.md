# Behaviour of multiple elements #

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

### Fix 2 - Keys ###
Another way to fix this is with the help of "key".
```[{type: Input, key: 1}, {type: Input, key: 2}]```
with the key present when the Input gets changes around due to a user clicking some functionality which moves the Input (sort by latest, etc...). It changes to this:
```[{type: Input, key: 2}, {type: Input, key: 1}]```
React knows now on rerender I need to swap the input DOM nodes around and the text we typed into the first element will move into the second position.