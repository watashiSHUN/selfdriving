class Car{
    constructor(x,y,width,height){
        // properties of the car

        // coordinates, center of the car
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.maxSpeed=3;
        this.friction=0.05;
        this.acceleration=0.2;

        this.control=new Controls();
    }

    update(){
        // TODO(shunxian): make the car to turn left and right
        if (this.control.forward){
            this.speed+=this.acceleration;
        }
        // vector, since it gives us a negative speed
        if(this.control.reverse){
            this.speed-=this.acceleration;
        }   
        // because y starts from top to bottom
        if (this.speed > 0){
            this.speed = Math.max(this.speed - this.friction,0);
        }else if (this.speed < 0){
            this.speed = Math.min(this.speed + this.friction,0);
        }

        // set max speed
        if (this.speed >= this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if (this.speed <= -this.maxSpeed){
            this.speed=-this.maxSpeed;
        }
        this.y-=this.speed;
    }
    
    draw(ctx){
        ctx.beginPath();
        // top_left.x, top_left.y, width, height
        // canvas x from left to right, y from top to bottom
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.fill();
    }
}