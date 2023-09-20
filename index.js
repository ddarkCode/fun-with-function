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
// log(fil())
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
// log(con())
// log(con())
//Make a function gensymf that makes a function that generates unique symbols
function gensymf(string) {
    const gen = from(1)
    return function() {
        return `"${string}${gen()}"`
    }
}

function gensymff(unary, seed) {
    return function(prefix) {
        let number = seed;
        return function() {
            return prefix + unary(number);
        }
    }
}

const geng = gensymf('G')
const genh = gensymf('H')
// log(geng())
// log(genh())
// log(geng())
// log(genh())
// log(geng())
// log(genh())

//Make a function fibonaccif thhat returns a generator that will return the next fibonacci number
function fibonaccif(first, second) {
    return function() {
        let next = first;
        first = second;
        second = next + first;
        return next;
    }
}

const fib = fibonaccif(0, 1);


//Write a counter function that returns an object that contains two functions 
//that implements an up/down counter hiding the counter
function counter(count) {
    return {
        up() {
            return count += 1;
        },
        down(){
            return count -= 1;
        }
    }
}

const {up, down} = counter(10);

//Make a revocable function that takes a binary function and returns an object containing an invoke function
//That can invoke the binary function and a revoke function that dsiables the binary function

function revocable(binary) {
    return {
        invoke(a, b) {
            if (binary === undefined) {
                return undefined
            }
            return binary(a, b);
        },
        revoke() {
            binary = undefined;
        }
    }
}

// const rev = revocable(add),
// add_rev = rev.invoke;
// log(add_rev(3, 4));
// rev.revoke();
// log(add_rev(5, 7));

//Make a function m that takes a value and an optional source string and returns them in an object
function m(value, source) {

    if (source === undefined) {
        return {value, "source": `${value}`}
    }
    return {value, "source": `${source}`}
}

// log(JSON.stringify(m(1)))
// log(JSON.stringify(m(Math.PI, "pi")))

//Write a function addm that takes two m objects and returns them in an object

function addm(m1, m2) {
    return {value: m1.value + m2.value, "source":  ` (${m1.source + "+" + m2.source}) `}
}

// log(JSON.stringify(addm(m(3), m(4))))
// log(JSON.stringify(addm(m(1), m(Math.PI, "pi"))))

//Write a function liftm that takes a binary and a string and returns a function that acts on m objects

function liftm(binary, string) {
    return function(m1, m2) {
        return m(binary(m1.value, m2.value), m1.source + string + m2.source)
    }
}

//Modify the function liftm so that the arguments it accepts can be either numbers or m objects
function liftm(binary, string) {
    return function(a, b) {
        if (typeof a === 'number' && b === undefined) {
            return m(binary(a, a), a + string + a)
        }
        if (typeof a === 'number' && typeof b === 'number') {
            return m(binary(a, b), a + string + b)
        }
        return m(binary(a.value, b.value), a.source + string + b.source)
    }
}

// addm = liftm(add, '+');
// log(JSON.stringify(addm( 4)))
// log(JSON.stringify(liftm(mul, '*')(m(3), m(4))))

//Write a function exp that evaluates simple array expressions

function exp(arr) {
    if (typeof arr === 'number') {
        return arr;
    }
    const [binary, first, second] = arr;
    return binary(first, second);
}
const sae = [mul, 5, 11]
// log(exp(sae));
// log(exp(42));

//Modify exp to evaluate nested array expressions

function exp(arr) {
    let [unary, rest] = arr;
    let [binary, squareArr1, squareArr2] = rest;

    return unary(binary(squareArr1[0](squareArr1[1]), squareArr2[0](squareArr2[1])))

}

const nae = [Math.sqrt, [add, [square, 4], [square, 3]]];
// log(exp(nae));

//Write A function addg that adds from many invocations until it sees an empty invocation
function addg(number) {
    if (number === undefined) {
        return number
    }
    let result = number;
    return function recur(next) {
        if (next === undefined) {
            return result;
        }
        result += next;
        return recur
    } 
}

//Write a function liftg that takes a binary function and apply it to many invocation
function liftg(binary) {
    return function recur(next) {
        if (next === undefined) {
            return next;
        } 
        return function more(nextValue) {
            if (nextValue === undefined) {
                return next;
            }
            next = binary(next, nextValue);
            return more;
        }
}
}

// log(liftg(mul)())
// log(liftg(mul)(3)())
// log(liftg(mul)(3)(0)(4)())
// log(liftg(mul)(1)(2)(4)(8)())

//Write a function arrayg that wiil build the array from many invocation.
function arrayg(value) {
    let arr = [];
    if (value === undefined) {
        return arr;
    }
    arr.push(value);
    return function more(nextValue) {
        if (nextValue === undefined) {
            return arr;
        }
        arr.push(nextValue);
        return more;
    }
}

// log(arrayg())
// log(arrayg(3)())
// log(arrayg(3)(4)(5)())

//Make a unary function continuize that returns a function that takes a callback and an argument

function continuize(func) {
    return function(callback, value) {
        callback(func(value));
    }
}

const sqrtc = continuize(Math.sqrt);
// sqrtc(log, 81);
// sqrtc(log, 25);

//Make an array wrapper object with methods get, store and append such that an attacker cannot get access to the private
//array

const vector = function() {
    const array = [];

    return {
        append(value) {
            array.push(value)
        },
        store(index, value) {
            array.splice(index, 0, value);
        },
        get(index) {
            const item = array[index];
            return item;
        }
    }
}
const myVector = vector();
myVector.append(7);
myVector.store(1, 8);
log(myVector.get(0))
log(myVector.get(1))