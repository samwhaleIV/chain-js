# chain-js
`chain-js` is a JavaScript library that builds off of default types to give you repeating functions, curried functions and more without the requirement for modifying the functions themselves.

### Different perspectives

As you already may know, JavaScript is a very versatile programming language, allowing for both [declarative](https://en.wikipedia.org/wiki/Declarative_programming) and [imperative](https://en.wikipedia.org/wiki/Imperative_programming) paradigms; the way that one JavaScript developer codes may look completely different from how another JavaScript developer does.
The key factors to this are:
- Background

What background does the developer have? Did they used to be a C++ dev? Have they known nothing ever but Scala? Is JavaScript their first language? Not everything thinks or writes the same, and all these factors and more influence your programming style. That's part of what makes JavaScript so adoptable and easy to learn, and also why there are so many strong opinions against it. Because JavaScript can serve so many purposes, sometimes it's not as well suited as another language that has much clearer and defined purpose. But let's not focus on that here. This library is about widening the possibilties, not closing them.
- Environment

Web client JavaScript doesn't serve the same functions as web [`node.js`](https://github.com/nodejs/node) JavaScript does. In node, you can expect some form of callback hell. On the web, you can expect some kind of event listener hell. Different environments call for different responses.

- Purpose

Depending on if we are calculating astro-rocket-zoology or animating a drop down menu, perhaps it would be more logical to use the most pragmatic paradigm. Astro-rocket-zoologists might not need to compute their algoritms with an imperative approach, and we shouldn't force them into. Likewise, it would also be more difficult to animate a drop down menu with a declarative approach.

Cue `chain-js`

### Right of the box
Natively, JavaScript already allows a lot of your functional programming needs. To name a few, there's `map`, `filter`, `reduce`, `forEach`, and no limit to the functions that you can create yourself. Here is a function that uses some of these list based "pure functions":
```js
const AreAnagrams = function(...words) {
    return (sets => {
        return (firstSet =>
            sets.reduce(
                (setValue,letterSet) => 
                setValue && letterSet.reduce(
                    (letterValue,letter,index) =>
                    letterValue && letter === firstSet[index]
                ,true)
            ,true)
        )(sets.shift());
    })(words.map(word=>Array.from(word).sort()));
}
```


### Reinventing the wheel but not more than anyone else has

You can already make a self-returning function in JavaScript very easily because functions are first-class. And there is no shortage of libraries that do all that and more, but the principle is simple and it looks something like this, a function that returns an uncalled function:

```js
function repeatableFunction(value) {
    console.log(`Value: ${value}`);
    return repeatableFunction;
}
```
This isn't a particularly useful function, but it allows you to do something like this:
```js
repeatableFunction("Hello")("World")("This chain can go on for as long as I want it to");
```
You'd likely never see this in a C language unless it's using some kind of delegate, and even then, it's on the fringe of typical use. Because, yes, it is odd, but it is essentially one of the fundemental aspects of a functional programming language and JavaScript won't throw a hissy fit if you want to write all your code this way!.

You could even store the end result of this chain to a variable, and use that chain again later. Though in our example this isn't particularly useful as there is no state associated with our function.
```js
var chain = repeatableFunction("I'm a chain link!")
    ("Second place isn't as cool as first place")
    ("Hey, at least you're not last!");

chain("Actually, you're not last, I'm last");
```

#TOO BE CONTINUED . THIS IS ALL VERY W.I.P.