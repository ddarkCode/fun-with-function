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

// log(add_ltd(3, 4))
// log(add_ltd(3, 4))

//Write a from function that produces a generator that will produce a series of values
function from(num) {
    return () => {
        const temp = num;
        num += 1;
        return temp;
    };
}

// const index = from(0);
// log(index())
// log(index())
// log(index())
// log(index())


//Write a to function that takes a generator and an end value and returns
//a generator that will produce numbers up to that limit

function to(gen, end) {
    return () => {
        const next = gen();
     
        if (next < end) {
            return next;
        }
        return undefined;
    }
}

// let index = to(from(1), 3);

// log(index())
// log(index())
// log(index())
// log(index())

//Write a fromTo function that returns a generator that produces values in a range
function fromTo(start, end) {
    return to(from(start), end);
}

// const index = fromTo(0, 3);
// log(index())
// log(index())
// log(index())
// log(index())

//Write an element function that takes an array and a generator and returns a
//generator that will produce values from that array, Make the gen optional

function element(array, gen) {
    if (gen === undefined) {
        gen = from(0);
    }
    return () => {
        const index = gen();

        if (index !== undefined) {
            return array[index];
        }  
    }
}

const elem = element(['a', 'b', 'c', 'd']);

// log(elem())
// log(elem())
// log(elem())
// log(elem())
// log(elem())
// log(elem())

//Write a collect function that takes a generator and an array and returns a function
//that collects it values in an array.
const array = [];
function collect(gen, arr)  {
   return () => {
    const value = gen();
    if (value !== undefined) {
        arr.push(value);
        return value;
    }
    return undefined;
   }
}

const col = collect(fromTo(0, 2), array);
// log(col())
// log(col())
// log(col())
// log(array)

//Write a filter function that takes a generator and a predicate and produces a generator that 
//produces values approved by the predicate

function filter(gen, predicate) {
    return () => {
        let value = gen();
       while(value !== undefined) {
        if (predicate(value)) {
            return value;
        }
        value = gen()
       }
       return undefined;
    }
}

const fil = filter(fromTo(0, 10), num => num % 3 === 0);
log(fil())
// log(fil())
// log(fil())
// log(fil())


//Write a concat function that takes two generators and produces a generator that returns their values

function concat(gen1, gen2) {
    return () => {
        let value = gen1();
       if (value !== undefined) {
        return value;
       }
       if (value === undefined) {
        return gen2()
       }
  }
}
//Solution to problem

function concat(gen1, gen2) {
    let gen = gen1;
    return () => {
        let value = gen();
        if (value !== undefined) {
            return value;
        }
        gen = gen2;
        return gen()
    }
}

const con = concat(fromTo(0,3), fromTo(0, 2));
log(con())
log(con())
log(con())
log(con())
log(con())
log(con())