function evaluate() {
    const double = function(value) {
        return value * 2;
    }
    const half = function(value) {
        return value / 2;
    }

    let thread1 = chain(5)(double); //the value of thread1 is 10.
    let thread2 = thread1(double) //the value of thread2 is 20

    let thread1Val = thread1({});
    if(thread1Val !== 10) {
        console.error("The value of thread1 is wrong for this stage!");
        return;
    }

    thread1 = thread1(half); //the value of thread1 is 5.

    thread1Val = thread1({});
    if(thread1Val !== 5) {
        console.error("The value of thread1 is wrong for this stage!");
        return;        
    }
    
    console.log("Chain function split test passed! :)");
}
evaluate();
