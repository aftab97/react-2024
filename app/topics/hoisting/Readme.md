# Hoisting #


Example below shows *hoisting,* It takes some of your JS code and brings it to the top of your file automatically:
``` 
console.log(aFunc(1,2)); //This works
console.log(aArrowFunc(1,2)); //Reference Error: Cannot access before initialisation

const aArrowFunc = () => a + b;

function aFunc(a,b){
    return a + b;
}

//function and var is hoisted but const and let are not because it is in a temporal dead zone
```


### Declaration Hoisting - using var ###
Being able to reference a variable in its scope before the line it is declared, without throwing a ReferenceError, but the value is always undefined. ("Declaration Hoisting")

```
console.log(a); //This gives back: undefined

var a = 2;
```

What happens is that this code gets converted to:
```
var  a = undefined; //It gets initialised at the top!

console.log(a);

a = 2;
```