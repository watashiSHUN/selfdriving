class Car{
    constructor(x,y,width,height){
        // properties of the car

        // coordinates, center of the car
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.control=new Controls();
    }

    update(){
        if (this.control.forward){
            this.y-=2;
        }
        if(this.control.reverse){
            this.y+=2;
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