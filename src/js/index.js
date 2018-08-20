import foo from "./foo.js";
var r = function() {
  console.log(foo);
};



let rr = [1, 23, 4].map(c => {
  return c + 1;
});

console.log(rr,r())

