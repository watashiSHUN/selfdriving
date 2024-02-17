class Road{
    constructor(x, width, laneCount=3){
        this.x = x; // Center of the road, not top left
        this.width = width;
        this.laneCount = laneCount; // Number of lanes
        
        this.left = x - width/2;
        this.right = x + width/2;
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
        ctx.moveTo(this.left, 0);
        ctx.lineTo(this.left, window.innerHeight);
        ctx.stroke();

        // draw right
        ctx.beginPath();
        ctx.moveTo(this.right, 0);
        ctx.lineTo(this.right, window.innerHeight);
        ctx.stroke();

        // draw lanes
        // 3 lanes => we only need to draw the splitters
        for(let i = 1; i < this.laneCount; i++){
            var x = linearInterpolation(this.left, this.right, i/this.laneCount)
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, window.innerHeight);
            ctx.stroke();
        }
    }
}