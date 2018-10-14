# chain-js
`chain-js` is a JavaScript library that builds off of default types to give you repeating functions, curried functions and more without the requirement for modifying the functions themselves.

###tl;dr

Don't want to read? Suit yourself.

#Chaining and linking
```js
let standardSyntax = (value) => Math.floor(Math.sqrt(value)) * 2;
```
This is fine, but there isn't emphasis on order of events, and nesting can be a pain.
```js
let verboserSyntax = value=> {
    value = Math.sqrt(value);
    value = Math.floor(value);
    value = value * 2;
    return value;
}
```
Nice, the order of events is clear, but we can still do better.
```js
//Linking: Create compounds functions without the explicitness of doing it yourself
let squaredFloorTimesTwo = link(Math.sqrt,Math.floor,value=>value * 2);
console.log(squaredFloorTimesTwoTimes(26))
```
```js
//Chaining: Like linking but on the fly. Used to get a value.
console.log(chain(26)(Math.sqrt)(Math.floor)(value=>{value * 2})({}))
```
Fun fact, you can link links or links of links! Go wild, be fearless! The overhead monster won't bite you too hard
#Streaming and collecting
```js
    //Collecting: For when you want to capture all values of executing a function multiple times. Returns a list.
    (value=>console.log(value))(Math.random())(42)("Stream and collection chains are very closely related").second()
    //Expected return value: 42

    //Streaming: Like collecting but for when you need to use the return values before the next invocation of the chain.
    Math.random.stream(
        (value)=>console.log(value)
    )(Math.random())("Something something nerdy reference to the number 42")
    //Expected return value: undefined/none
```

### Different perspectives

As you already may know, JavaScript is a very versatile programming language, allowing for both [declarative](https://en.wikipedia.org/wiki/Declarative_programming) and [imperative](https://en.wikipedia.org/wiki/Imperative_programming) paradigms; the way that one JavaScript developer codes may look completely different from how another JavaScript developer does.
The key factors to this are:
- Background

What background does the developer have? Did they used to be a C++ dev? Have they known nothing ever but Scala? Is JavaScript their first language? Not everything thinks or writes the same, and all these factors and more influence your programming style. That's part of what makes JavaScript so adoptable and easy to learn, and also why there are so many strong opinions against it. Because JavaScript can serve so many purposes, sometimes it's not as well suited as another language that has much clearer and defined purpose. But let's not focus on that here. This library is about widening the possibilties, not closing them.
- Environment

Web client JavaScript doesn't serve the same functions as web [`node.js`](https://github.com/nodejs/node) JavaScript does. In node, you can expect some form of callback hell. On the web, you can expect some kind of event listener hell. Different environments call for different responses.

- Purpose

Depending on if we are calculating astro-rocket-zoology or animating a drop down menu, perhaps it would be more logical to use the most pragmatic paradigm. Astro-rocket-zoologists might not need to compute their algoritms with an imperative approach, and we shouldn't force them into. Likewise, it would also be more difficult to animate a drop down menu with a declarative approach.

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
You can also create functional async code using promises which allows you to chain functions by passing variables through them. As you'll see later, we form this in a more synchronous manner with significantly less boiler plate in a paradigm intended more for pure functions where we should always expect a result rather than event safety. But I digress, [here is an example taken from that demonstrates asyncronous promise chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises):
```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

### Reinventing the wheel but not more than anyone else has

You can already make a self-returning function in JavaScript very easily because functions are first-class. And there is no shortage of libraries that do all that and more, but the principle is simple and it looks something like this, a function that returns an uncalled function or itself:

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
You'd likely never see this syntax in a C language unless it's using some kind of hacky delegate system, and even then, it's on the fringe of typical use. Because, yes, it is odd, but chaining functions like this is one of the fundemental aspects of a functional programming language and JavaScript won't throw a hissy fit if you want to write all your code this way! (Other developers you work with might, though)

You could even store the end result of this chain to a variable, and use that chain again later. In our example this isn't particularly useful as there is no state associated with our function.
```js
var chain = repeatableFunction("I'm a chain link!")
    ("Second place isn't as cool as first place")
    ("Hey, at least you're not last!");

chain("Actually, you're not last, I'm last");
```
But what if we don't want to create new a function for this?

Cue `chain-js`

Much to the dismay of thousands of JavaScript developers groaning in the background, extending default types by accessing the prototype is a beautiful thing.

```js
var chain = console.log.multi("I'm a chain link!")
    ("But what if ECMA makes that word a function in the futureeeee")
    ("Library incompatibilities!")
    ("Hurr durrrrr muh default objects")

chain("Never modify the prototype of built in types!")("Ahem, stop telling me what to do. Don't like it? Don't use it")
```