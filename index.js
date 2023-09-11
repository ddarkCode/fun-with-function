const log = console.log;
//Three binary functions add, sub and mul

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

// log(add(3, 4));
// log(sub(3, 4));
// log(mul(3, 4));

const identityF = (arg) => {
    return () => arg;
}

const three = identityF(3)
// log(three())

//Write a function addf that adds from two invocation

const addf = (first) => {
    return second => first + second;
}

// log(addf(3)(4))

//Write a function liftf that takes a binary function and makes it callable with two invocations

const liftf = (binary) => {
    return first => {
        return second => binary(first, second);
    }
}
// log(liftf(mul)(5)(6));

//Write a function curry that takes a binary function and an argument and returns a function that can take a second argument

const curry = (binary, first ) => {
    return second => binary(first, second);
}
// log(curry(mul, 5)(6))

//Without writing any new function show three ways to create the inc function

let inc = addf(1);
inc = liftf(add)(1)
inc = curry(add, 1)
log(inc(5))