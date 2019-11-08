const calc = require('./calc');
var a=parseInt(process.argv[2]);
var b=parseInt(process.argv[3]);

console.log('add:   '+calc.add(a,b));
console.log('sub:   '+calc.sub(a,b));
console.log('mult:   '+calc.mult(a,b));
console.log('div:   '+calc.div(a,b));