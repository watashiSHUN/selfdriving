class Sensor{
    constructor(car){
        this.car = car;
        // Assuming at least 2 rays
        // TODO: support ray count == 1
        this.rayCount = 6;
        this.rayLength = 150;
        // ray spread is the total angle covered by all the rays
        this.raySpread = Math.PI/2; // 45 degrees

        // Store the absolute position, start->end

        // [{start:{x:, y:}, 
        //   end:{x:, y:}}...]
        this.rays = [];
        this.intersections = {};
    }

    update(roadBorders){
        this.#castRays();
        // Compute rays intersection with the road
        this.#detectIntersection(roadBorders);       
    }

    #detectIntersection(roadBorders){
        // Calculate the intersection of the rays with the road
        // Remove existing intersections
        this.intersections = [];

        this.rays.forEach((ray, index) => {
            for (let i = 0; i < roadBorders.length; i++) {
                let intersection = getIntersection(ray, roadBorders[i]);
                if(intersection.intersect){
                    // based on the offset, we can determine which intersection to take
                    // Take the minimum offset => smallest == closest
                    if(!(index in this.intersections) || this.intersections[index].offset < intersection.offset){
                        this.intersections[index] = intersection;
                    } 
                }
            }
        });
    }

    #castRays(){
        // (1) Remove any old rays
        this.rays=[];
        // (1) => use linear interpolation to draw each line (the angle between start and each line)
        let firstRayAngle = this.car.angle + this.raySpread/2;
        let endRayAngle = this.car.angle - this.raySpread/2;
        // (2) => start from left most
        for(let i = 0; i < this.rayCount; i++){
            // NOTE: only rayCount-1 angles
            let currentAngle = linearInterpolation(firstRayAngle, endRayAngle, i/(this.rayCount-1));
            this.rays.push(this.#computeRay(currentAngle));
        }   
    }

    #computeRay(angle){
        // NOTE: rays always have the same start (car's center)
        let start = {x: this.car.x, y: this.car.y};
        let end = {x: this.car.x - this.rayLength*Math.sin(angle), 
            y: this.car.y - this.rayLength*Math.cos(angle)}
        return {start:start, end:end}
    }

    draw(ctx){
        ctx.save();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "yellow";
        this.rays.forEach(ray => {
            ctx.beginPath();
            ctx.moveTo(ray.start.x,ray.start.y);
            ctx.lineTo(ray.end.x,ray.end.y);
            ctx.stroke();
        });

        ctx.strokeStyle = "red";
        for(const [key,value] of Object.entries(this.intersections)){
            ctx.beginPath();
            ctx.moveTo(value.segmentXB.start.x, value.segmentXB.start.y);
            ctx.lineTo(value.segmentXB.end.x, value.segmentXB.end.y);
            ctx.stroke();
        }

        ctx.restore();
    }
}