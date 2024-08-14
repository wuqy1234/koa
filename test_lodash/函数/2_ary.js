const _ = require('loadsh');


const aa=_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
console.log(aa);
const bb=['6', '8', '10'].map(_.ary(parseInt, 1))
console.log(bb);
const cc=_.ary((a,b,c,d,e,f)=>{ 
    console.log(a,b,c,d,e,f);
},6)
console.log(cc(1,2,3,4,5,6));