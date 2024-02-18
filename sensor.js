class Sensor{
    constructor(car){
        this.car = car;
        // Assume at least 2 rays
        this.rayCount = 3;
        this.rayLength = 100;
        // ray spread is the total angle covered by all the rays
        this.raySpread = Math.PI/4; // 45 degrees

        this.rays=[];
    }

    update(){
        // Compute new rays as the car moves
        // start + end of a ray
        // if we have the radian, we can compute the X,Y
        this.rays=[];

        var anglesBetween = this.raySpread/(this.rayCount-1)
        
        // need to factor in angles of the car
        var startAngle = this.raySpread/2 + this.car.angle;
        this.rays.push(this.#computeRay(startAngle));
        var endAngle = -this.raySpread/2 + this.car.angle;
        this.rays.push(this.#computeRay(endAngle));

        for(let i = 1; i < this.rayCount; i++){
            // compute x and y, rays in the middle
            var current = startAngle - anglesBetween;
            this.rays.push(this.#computeRay(current));
        }   
    }

    #computeRay(angle){
        return [-this.rayLength*Math.sin(angle), -this.rayLength*Math.cos(angle)]
    }

    draw(ctx){
        ctx.save();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        ctx.translate(this.car.x,this.car.y);
        this.rays.forEach(ray => {
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(ray[0],ray[1]);
            ctx.stroke();
        });

        ctx.restore();
    }
}