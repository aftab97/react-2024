# Rendering within React #

Made up of two stages (Render Phase / Commit Phase):
![rendering process](/assets/re-rendering-diagram.png)

## Render Phase ##
Within the first phase the JSX code is converted into a JS representation (JS Objects) of what the HTML looks like

On intial render is starts from the root component and works it way down building a react element tree of what the DOM looks like.

*For re-rendering*
Only slight difference is that at this point when a state update occurs or prop change etc. A new JS representation of the DOM identifying all the components that require an update, called the Virtual DOM. After that it uses a process called Diffing that to identify the changes between the old Dom and the new DOM.

## Commit Phase ##
The actual DOM manipulation of the real DOM happens during the commit phase. The appendChild() DOM API is used to put all the DOM nodes created onto the screen.

*For re-rendering*
The minimal necessary operations are applied to make the DOM match the latest rendering output



### Diffing ###
Diffing Algorithm figures out the least amount of operations to sync the Virtual DOM into the Actual DOM. The algorithm itself uses the O(n) algorithm which is incredibly fast.

*O(n) - pronounced Big O notation*
[learn more about Big O notation here](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/)

### Reconciliation ###
The process inbetween the two phases os called Reconciliation. It covers how the Virtual DOM gets synced into the Real DOM
