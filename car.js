class Car{
    constructor(x,y,width,height){
        // properties of the car

        // coordinates, center of the car
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.polyGone = this.#createPolygon();

        this.speed=0;
        this.maxSpeed=3;
        this.friction=0.03;
        // unit is the degree
        this.angle=0;
        // friction being a factor of the acceleration
        // we will never apply too much friction (it will reach 0)
        this.acceleration=0.2;

        // Owns the sensor and the responsibility to update it and draw it
        this.sensor = new Sensor(this);
        this.control = new Controls();
    }

    #createPolygon(){
        // Get four corners of the car
        const points = [];
        // top right before angle x+width/2, y-height/2, and its angle
        let angleBefore = Math.atan2(this.height, this.width);
        let newAngle = this.angle + angleBefore;
        let newAngle2 = angleBefore - this.angle;
        // When computing hypothenus of a triangle, the order of the sides does not matter
        let diagonalLength = Math.hypot(this.width/2, this.height/2);
        let topRight = {x: this.x + Math.cos(newAngle)*diagonalLength, y: this.y - Math.sin(newAngle)*diagonalLength};
        points.push(topRight);

        let topLeft = {x: this.x - Math.cos(newAngle2)*diagonalLength, y: this.y - Math.sin(newAngle2)*diagonalLength};
        points.push(topLeft);

        let bottomLeft = {x: this.x - Math.cos(newAngle)*diagonalLength, y: this.y + Math.sin(newAngle)*diagonalLength};
        points.push(bottomLeft);

        let bottomRight = {x: this.x + Math.cos(newAngle2)*diagonalLength, y: this.y + Math.sin(newAngle2)*diagonalLength};
        points.push(bottomRight);

        // clockwise order
        return points;
    }

    update(roadBorders){
        this.#updateSpeed();
        this.#updateDirection();
        this.#updateCoordinate();
        this.polyGone = this.#createPolygon();
        this.sensor.update(roadBorders);
    }

    #updateSpeed(){
        // after calculation, speed is a vector on Y axis
        if (this.control.forward){
            this.speed+=this.acceleration;
        }
        // vector, since it gives us a negative speed
        if(this.control.reverse){
            this.speed-=this.acceleration;
        }   
        if (this.speed > 0){
            this.speed = Math.max(this.speed - this.friction,0);
            //this.speed -= this.friction;
        }
        // apply friction once, we can not make a positive speed negative through friction
        else if (this.speed < 0){
            //this.speed += this.friction;
            this.speed = Math.min(this.speed + this.friction,0);
        }

        // Cap the speed at the end, after all the calculations.
        if (this.speed >= this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        // max reverse speed is half
        if (this.speed <= -this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
    }

    #updateCoordinate(){
        // speed is the x+y vector, we need to resolve its x,y

        // when turning left, angle increase, sin(-angle) is positive, it goes left
        // when turning left BACKWARDS, negative speed * sin(angle) is negative, it goes right
                
        // Refer to this image for the math
        // https://i.stack.imgur.com/iBwl4.png
        this.x-=this.speed*Math.sin(this.angle);
        this.y-=this.speed*Math.cos(this.angle);
    }

    #updateDirection(){
        // Does not allow rotating while not moving
        if(this.speed != 0){
            var flip = this.speed > 0 ? 1 : -1;
            if(this.control.left){
                this.angle+=0.03 * flip;
            }if(this.control.right){
                this.angle-=0.03 * flip;
            }
        }
    }
    
    draw(ctx){
        // draw polygon
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.moveTo(this.polyGone[0].x,this.polyGone[0].y);
        for (let i = 0; i< this.polyGone.length; i++){
            let end = this.polyGone[(i+1)%this.polyGone.length];
            ctx.lineTo(end.x,end.y);
            ctx.stroke();
        }
        ctx.fillStyle = "black";
        ctx.fill();

        this.sensor.draw(ctx);
    }
}