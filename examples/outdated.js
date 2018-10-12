//Ignore this file for now, it has slightly outdated syntax, but the ideas represented here are being/will be parsed into readme.md

var results = console.log.repeat("Hello, world!")("What do you think about this syntax?")("Yes, it's odd.")({});
//All these lines are logged one by one, as you would expect
//Terminating a chain is not required per say, but doing so returns an array of all return values.

console.log(
    `Total: ${((base,value)=>{return base + value}).recurse(2)(4)(6)({})}`
); //Total: 12

Math.sqrt.stream(result=>console.log(`Square root: ${result}`))(25)(36)(82);
//Terminating a stream just clears the sequence, the values are already sent to the callback method.

//It's unlikely you'll consume values twice with a stream,
//but if this is what you're looking for use a chain with a wrapped function (which is essentially the inverse of a stream):
var allValues = (value=>{
    console.log(`Square root: ${value}`);
    return Math.sqrt(value)
}).repeat(25)(36)(82)({});

var chain = Math.random.repeat()()()();
//the chain can be continued again later so long as it isn't terminated...
var lastValue = chain()()({}).last();
console.log(`Last random value: ${lastValue}`);

var sum = pass(5)(Math.sqrt)(Math.floor)(value=>{return value * 2})({});

//creating a function
var squaredFloorTimesTwo = (num)=>pass(num)(Math.sqrt)(Math.floor)(value=>{return value * 2})({});

var squaredFloorTimesTwo = link(Math.sqrt,Math.floor,value=>value * 2);

console.log(`Sum: ${sum}`);
//           Sum: 2

//Introducing 'state' into a 'functional' paradigm
function functionalStateHandler(base,value) {
    switch(base.state) {
        case "add":
            base.total += value;
            break;
        case "subtract":
            base.total -= value;
            break;
    }
    if(base.total > 10) {
        base.state = "subtract";
    }
    console.log(`Current value: ${base.total}`);
    return base;
}
var result = functionalStateHandler.curry
    ({state: "add",total: 0})
        (5)
        (6)
        (4)
    ({}).total;
console.log(`Result: ${result}`);
