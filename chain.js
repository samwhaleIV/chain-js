//This is a helper function for the various functional chains.
function IsChainBreaker(values) { //basically, this checks if there is a single parameter and it is "{}"
    if(values.length !== 1) return false;
    const value = values[0];
    if(typeof value !== "object") return false;
    if(value == null) return false;
    return Object.keys(value).length === 0;
}
function link(...methods) {
    return function(...base) {
        return methods.reduce(
            (value,method) => method.apply(null,value),base
        )
    };
}
//This is a one off function that allows for greater declaritive flow and works great in conjunction with the functional chains.
//The first function can be multi-parameterized, but the subsequent calls works off of single objects
function chain(...base) {

    //Below is a parameterized first class function containing a self executing function containing another
    //paramterized first class function that is a recursive reference to itself.. FML

    //Why did I have to use such drastic measures?

    //Repeater creator encapsultes the first re-entry if you diverge the chain,
    //Then, the self executing base passthrough encapsulates the subsequent calls.
    //Yes, there needs to be both, even though it's hard to track (and debug) this can be verified through "tests/chain function - split test".

    //If you only have the first closure it won't work as expected. If you only have the second closure,
    //it won't work on the first re-entry, but all subsequent invocations

    const repeaterCreator = function(base) {
        return function(method) {
            return (function(base) {
                switch(typeof method) {
                    case "function":
                        base = method(base); //This invokes the method and updates the base for when we are going to return it later
                        return repeaterCreator(base);
                    case "object":
                        return base; //This returns the last value of the chain.
                    default:
                        return repeaterCreator(base); //This allows the chain to continue of the supplied method/overload is invalid
                }
            })(base);
        };
    };

    //This is a mirror of repeater creator. It is mirroed to allow for method.apply, allowing the first function of the chain to be multi-parameterized
    return (function(base) {
        return function(method) { //Duping this method allows the first-function multi-parameterization
            switch(typeof method) {
                case "function":
                    base = method.apply(null,base); //This expands base because it is an array here, but in the future base will be a single object
                    return repeaterCreator(base);
                case "object":
                    return base; //This returns the list the parameters of the first link in the chain.
                default:
                    return repeaterCreator(base);
            }   
        };
    })(base);
}

Function.prototype.sequence = function(base) {
    const method = this;
    const repeaterCreator = function(base) {
        return function(...values) {
            return (function(base) {
                if(IsChainBreaker(values)) {
                    return base; //For a sequence chain, we can return a final value. If all values or a specific value is needed, a stream or collection chain is needed.
                }
                base = method(base,...values);
                return repeaterCreator(base);
            })(base);
        };
    };
    return repeaterCreator(base);
}

Function.prototype.stream = function(callback) {
    const method = this;
    const repeater = function(...values) {
        if(IsChainBreaker(values)) {
            return; //Unlike a sequence chain, stream chains shouldn't return a final value, nor an accumulated list of all the chain's values.
        }
        const result = method(...values);
        if(callback) {
            callback(result);
        }
        return repeater;
    }
    return repeater;
}

//A stripped down version of the collection chain intended for void functions. e.g, console.log.multi("Hello")("World");
Function.prototype.multi = function(...args) {
    const method = this;
    const repeater = function(...values) {
        if(IsChainBreaker(values)) {
            return; //Breaking the chain will just ensure that it can't be used again
        }
        method(...values);
        return repeater;
    }
    method(...args);
    return repeater;
}

//({}) can be called to release the collection chain's accumulated array if you don't trust the garbage collector to do its job
//(newsflash, it will do it's job, but the option is there for consistency with the other chain functions)
//Perhaps you could also have some fancy, messy loop that checks if the collection chain can still be used by a 'typeof val === "function"'
Function.prototype.collect = function(...args) {                          
    const method = this;
    const repeaterCreator = function(results) {
        return function(...values) {
            return (function(results) {
                if(IsChainBreaker(values)) {
                    return results; //For a collection chain, we return all of the results along the chain. It can also be thought as an accumulator.
                }
                let newResults = results.slice(
                    0,results.length
                );
                newResults.push(
                    method(...values)
                );
                return repeaterCreator(newResults);
            })(results);
        };
    };
    return repeaterCreator([method(...args)]);
}
//Array items 1-6
Array.prototype.first = function() {
    return this[0];
}
Array.prototype.second = function() {
    return this[1];
}
Array.prototype.third = function() {
    return this[2];
}
Array.prototype.fourth = function() {
    return this[3];
}
Array.prototype.fifth = function() {
    return this[4];
}
Array.prototype.sixth = function() {
    return this[5];
}
//Array items Last to (last - 5);
Array.prototype.last = function() {
    return this[this.length - 1];
}
Array.prototype.secondRight = function() {
    return this[this.length - 2];
}
Array.prototype.thirdRight = function() {
    return this[this.length - 3];
}
Array.prototype.fourthRight = function() {
    return this[this.length - 4];
}
Array.prototype.fifthRight = function() {
    return this[this.length - 5];
}
Array.prototype.sixthRight = function() {
    return this[this.length - 6];
}
//A resistance value of 1 results in all values staying in place.
//A resistance value of 0.3 results in values staying in place 30% of the time.
//A resistance value of 0 results in values moving either up or down 100% of the timea a la 50% + 50% = 100%
Array.prototype.randomSort = function(resistance=0.3) { 
    //We allocate and compute these ahead of time to save cycles in every iteration of sort.
    //The array could be quite large, so we don't want to add much more overhead than sort already has.
    const floor = 0.5 - tolerance/2;
    const ceiling = floor + tolerance;
    return this.sort(() => {
        const random = Math.random();
        //We don't use <= or >= in these because it is veryyyy unlikely (and pointless) that
        //the random value will be exact to the decimal point. And, if the resistance is 1, the floor would always be hit.
        if(random < floor) {
            return -1;
        } else if(random > ceiling) {
            return 1;
        } else {
            return 0;
        }
    });
}
