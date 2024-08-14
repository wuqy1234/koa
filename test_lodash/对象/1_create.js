const _ = require('loadsh');


function Shape() {
    this.x = 0;
    this.y = 0;
}

function Circle() {
    Shape.call(this);
}
//创建一个新的对象，该对象继承自Shape.prototype，并且Shape.prototype的constructor属性被重置为Circle。
//把Shape的原型属性，和一个新的对象拼接起来，形成一个新对象。
Circle.prototype = _.create(Shape.prototype, {
    'constructor': Circle
});

var circle = new Circle;
circle instanceof Circle;
// => true

circle instanceof Shape;
// => true
