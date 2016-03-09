(function () {
    'use strict';

    /**
     * Array that holds the elements of type circle
     * @type {Array}
     */
    var circles = new Array();

    /**
     * Array that holds the elements of type square
     * @type {Array}
     */
    var squares = new Array();

    /**
     * The canvas element
     * @type {Element}
     */
    var canvas = document.getElementById("canvas");

    /**
     * The context of the canvas
     */
    var context = canvas.getContext('2d');

    canvas.addEventListener("click", clickEvent);

    /**
     * Animation frame
     */
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    /**
     * Class constructor for the type Shape
     * @param speed
     * @param size
     * @param xPos
     * @param yPos
     * @constructor
     */
    function Shape(speed, size, xPos, yPos) {
        this.deltaX = getRandomSign() * speed;
        this.deltaY = getRandomSign() * speed;
        this.size = size;
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = getRandomColor();
    }

    /**
     * Method for updating the position of the shape
     */
    Shape.prototype.update = function () {

        this.xPos = this.xPos + this.deltaX;
        this.yPos = this.yPos + this.deltaY;

        if (this.xPos < 0 || this.xPos + this.size > canvas.width) {
            this.deltaX = 0 - this.deltaX;
        }

        if (this.yPos < 0 || this.yPos + this.size > canvas.height) {
            this.deltaY = 0 - this.deltaY;
        }

    }

    /**
     * Class constructor for the type Circle
     * @param speed
     * @param size
     * @param xPos
     * @param yPos
     * @constructor
     */
    function Circle(speed, size, xPos, yPos) {
        Shape.apply(this, arguments);
    }

    /**
     * Class constructor for the type Square
     * @param speed
     * @param size
     * @param xPos
     * @param yPos
     * @constructor
     */
    function Square(speed, size, xPos, yPos) {
        Shape.apply(this, arguments);
    }

    Circle.prototype = Object.create(Shape.prototype); 

    Square.prototype = Object.create(Shape.prototype); 

    /**
     * Overloading and extening the method update
     */
    Circle.prototype.update = function () {

        Shape.prototype.update.call(this);

        context.beginPath();
        context.arc(
            this.xPos,
            this.yPos,
            this.size,
            0,
            Math.PI * 2,
            false);

        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    };

    /**
     * Overloading and extening the method update
     */
    Square.prototype.update = function () {

        Shape.prototype.update.call(this);

        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.size, this.size);

    };

    /**
     * Handler for the click event
     * @param e
     */
    function clickEvent(e) {
        var speed = getRandomInt(1, 5);
        var size = getRandomInt(10, 50);

        // generate square or a circle base on the size being even or odd number
        if (size % 2 === 0) {
            var circle = new Circle(speed, size, e.clientX, e.clientY);
            circles.push(circle);
        } else {
            var square = new Square(speed, size, e.clientX, e.clientY);
            squares.push(square);
        }

    }

    /**
     * Generates a random hex color
     * @returns {string}
     */
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Generates random integer within a certain range
     * @param min
     * @param max
     * @returns {number}
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates random positive or negative sign
     * @returns {number}
     */
    function getRandomSign() {
        return Math.round(Math.random()) * 2 - 1;
    }

    /**
     * Main method for drawing the elements on the canvas frame by frame
     */
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < circles.length; i++) {
            var myCircle = circles[i];
            myCircle.update();
        }

        for (var i = 0; i < squares.length; i++) {
            var square = squares[i];
            square.update();
        }

        requestAnimationFrame(draw);
    }

    draw();

})();