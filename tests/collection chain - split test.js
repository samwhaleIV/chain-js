function evaluate() {
    const testFunction = function(...args) {
        return args;
    }

    let test = testFunction.collect("Thread 1 start")("string1");
    let test2 = test;

    test2 = test2("Thread 2 start")("string3");
    test = test("Thread 3 start");

    const finalList1 = test({});
    const finalList2 = test2({});

    console.log.multi("List 1:")(finalList1)("List 2:")(finaLlist2);
    if(finalList1 === finalList2) {
        console.error("Final list 1 and 2 reference the same array! They should be split");
        return;
    }
    if(finalList1.length !== 3) {
        console.error("Final list 1 does not contain the expected output!");
        return;        
    }
    if(finalist2.length !== 4) {
        console.error("Final list 2 does not contain the expected output!");
        return;
    }
    console.log("Collection chain split test passed (probably)");
}
evaluate();
