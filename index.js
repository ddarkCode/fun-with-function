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
// log(inc(5))

//Write a function twice that takes a binary function and returns a unary function that pass it argument to the binary function twice

const twice = (binary) => {
    return x => {
        return binary(x, x);
    }
}
let doubl = twice(add)
// log(doubl(11))
let square = twice(mul)
// log(square(11))

//Write reverse, a funnction that reverses the arguments of a binary function

const reverse = binary => {
    return (first, second) => binary(second, first);
}
let bus = reverse(sub);
// log(bus(3, 2));

//Write a function  composeu that takes two unary functions and returns a unary function that calls them both
// composeu(doubl, square)(5) === 100
const composeu = (func1, func2) => {
    return x => func2(func1(x));
}

// log(composeu(doubl, square)(5))

//Write a function composeb that takes two binary functions and returns a function that calls them both

function composeb(binary1, binary2) {
    return (first, second, third) => {
        return binary2(binary1(first, second), third)
    }
}
// log(composeb(add, mul)(2,3,7 ))

//Write a limit function that allows a binary function to be called a limited number of times

const limit = (binary, x) => {
   return function(first, second) {
    while (x > 0) {
        x -= 1
        return binary(first, second);
    }
    return undefined;
   }
}

let add_ltd = limit(add, 4);

log(add_ltd(3, 4))
log(add_ltd(3, 4))
log(add_ltd(3, 4))
log(add_ltd(3, 4))
log(add_ltd(3, 4))
log(add_ltd(3, 4))