# Shallow vs Deep Clone #

When you make a copy of a non-primative value (array, object...) and you make a change to it both the copy and original will get the same change because we copy the refernce

```
// This is copying the same array reference from in memory
const a = [10,20,30];
const b = a;
```


![alt](/assets//non-primative.png)

Which is why when you make a change to one of the const holding the reference it makes the same change to the other
const