# Shallow vs Deep Clone #

When you make a copy of a non-primative value (array, object...) and you make a change to it both the copy and original will get the same change because we copy the reference from in memory

```
// Object & Arrays & Functions (non primative)
const a1 = [10,20,30];
console.log(a1)

// This is copying the same array reference from in memory
const a2 = a1;
console.log(a2) //[10,20,30]

a2[1] = 200;
console.log(a2) //[10,200,30]
console.log(a1) //[10,200,30] ?? because it copied the same reference!
```

Which is why when you make a change to one of the const holding the reference it makes the same change to the other
const