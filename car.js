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
        this.friction=0.03;
        // friction being a factor of the acceleration
        // we will never apply too much friction (it will reach 0)
        this.acceleration=0.2;

        this.control=new Controls();
    }

    update(){
        // TODO(shunxian): make the following order independent
        this.updateX()
        this.updateY()
    }

    updateY(){
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
        // because y starts from top to bottom
        this.y-=this.speed;
    }

    updateX(){
        if(this.control.left){
            this.x-=2;
        }
        if(this.control.right){
            this.x+=2;
        }
    }
    
    draw(ctx){
        ctx.beginPath();
        // top_left.x, top_left.y, width, height
        // canvas x from left to right, y from top to bottom
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.fill();
    }
}