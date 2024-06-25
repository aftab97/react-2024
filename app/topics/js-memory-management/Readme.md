# JS/ React Memory Management #

## How Javascript manages its memory ##
Stack and Heap both build towards the center but if one of them start getting big you get stack overflow.


```
function main(){
//numWal is stored in a stack frame because they are local to the function
    const numVal = 1;
}
main();
```

Here is another example:
```
function anotherFunction(value){
    let v = value;
    console.log(v);
}

function main(){
    const numVal = 1;
    const aFlag = true;
    anotherFunction = 1;
}
```
```These are primative values being stored in the stack frame```
When running through main()         |  After (Garbage Collector pops stack)
:----------------------------------:|:----------------------------------:
![](/assets/stack-and-heap-1.png)   |  ![](/assets/stack-and-heap-2.png)

But if each recursion creates a new stack frame this can lead to ```StackOverflow```


## Working with Non Primative values ##
This is often not stored in the stack frame because they change size and you can push and pop e.g an Array

Example code with an Array:
```
function main(){
    const numVal = 1;
    const numbers = [10,20,30];
}

main();
```

This would then in turn reference the array from Heap (location in memory)

![heap reference](/assets/stack-and-heap-3.png)

Example with Object and Functions using cloning the same array:
```
function anotherFunction(vals){
    console.log(vals)
}

function main(){
    const values = {x:[10,20], y:[30,40]}
    anotherFunction(values);
}

main();
```

Notice how when ```anotherFunction(value) -> gets used as vals ``` it references the same array instead of making a copy
![heap reference with array](/assets/stack-and-heap-4.png)

So when you do something like this:
```
function main(){
    const numbers1 = [10,20,30];
    const numbers2 = [10,20,30];
    console.log(numbers1 === numbers2); // False ??? because they both allocated to different Heap stacks which are being referenced
}

main();
```
JS compares using the memory reference and even though the contents are the same they do not have the same reference as seen:
![heap reference with array](/assets/stack-and-heap-5.png)


Javascript Examples:
```
Object.is(false, false); //true
Object.is(true, false); //false
Object.is(10, 20); //false
Object.is(20, 20); //true

Object.is([], []); //false - because different memory locations
Object.is([10], [10]); //false - because different memory locations

const a = [10];
const b = [10];
Object.is(a, b); //false - because referencing different memory

const a = [10];
const b = b;
Object.is(a, b); //true - because referencing the same memory

const a = [10];
const b = [10];
Object.is(a[0], b[0]); //true because they are both referencing the same value (10)

const a = ["c","b","a"];
const b = a.sort();
console.log(b); //["a","b","c"]
console.log(a); //["a","b","c"] -> the same because it references the same array in memory

instead do .toSorted()
OR
[...a].sort();


//Dont do this:
JSON.stringify(data); //uses a ton of memory
```

Examples with React:
```
function Counter() {
    const [counter, setCounter] = useState({count: 0});

    const onIncrement = () =>{
        //This will not work
        data.count += 1; //This will look for data reference in memory and add 1 to it
        setData(data); // in the background this will do Object.is(oldValue, newValue); -> true! ?? because it uses the same reference (data)
    }

    useEffect(()=>{
        console.log(`${data.count}`);
        },
    [])
}
```


instead:
```
function Counter() {
    const [counter, setCounter] = useState({count: 0});

    const onIncrement = () =>{
        //Works! will rerender!
        setData({ count: data.count + 1}); // in the background this will do Object.is(oldValue, newValue); -> false - because it now creates a new Object in the heap instead of referring to the same object as before
    }

    useEffect(()=>{
        console.log(`${data.count}`);
        },
    [])
}
```

