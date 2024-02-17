class Road{
    constructor(x, width, laneCount=3){
        this.x = x; // Center of the road, not top left
        this.width = width;
        this.laneCount = laneCount; // Number of lanes
        
        this.left = x - width/2;
        this.right = x + width/2;

        // TODO(shunxian): remove these, make the road infinite
        this.top = -1000000;
        this.bottom = this.top*-1;
    }

    // return the x coordinate of the lane center (where we can place cars)
    // lane is 0-indexed
    getLaneCenter(lane){
        if (lane < 0 || lane >= this.laneCount){
            throw "Invalid lane index";
        }
        return linearInterpolation(this.left, this.right, (lane+0.5)/this.laneCount);
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // draw a line
        // https://www.educative.io/answers/how-to-draw-lines-on-canvas-using-javascript
        // `lineTo`
        
        // draw left
        ctx.beginPath();
        // Y should be infinte (the same as the canvas)
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();

        // draw right
        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();

        // draw lanes
        // 3 lanes => we only need to draw the splitters
        for(let i = 1; i < this.laneCount; i++){
            var x = linearInterpolation(this.left, this.right, i/this.laneCount)
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}