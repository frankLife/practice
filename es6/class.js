class A {
}

console.log(A.prototype === Function.prototype);
// true

class B extends A {
}

console.log(B.prototype === A)
// true

class C extends Object {
}

console.log(C.prototype === Object);
// true