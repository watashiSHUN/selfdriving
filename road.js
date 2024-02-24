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

    // return 2 lines
    // [{start:{x, y}, end:{x, y}}, {start:{x, y}, end:{x, y]
    getBorders(){
        var leftBorder = {
            // top left
            start: {x: this.left, y: this.top}, 
            end: {x: this.left, y: this.bottom}};
        var rightBorder = {
            start: {x: this.right, y: this.top}, 
            end: {x: this.right, y: this.bottom}};
        
        return [leftBorder, rightBorder];
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        // draw a line
        // https://www.educative.io/answers/how-to-draw-lines-on-canvas-using-javascript
        // `lineTo`
        
        // draw borders
        var borders = this.getBorders();
        borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border.start.x, border.start.y);
            ctx.lineTo(border.end.x, border.end.y);
            ctx.stroke();
        });

        // draw lanes
        // 3 lanes => we only need to draw the splitters
        for(let i = 1; i < this.laneCount; i++){
            var x = linearInterpolation(this.left, this.right, i/this.laneCount)
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
            // Clear the line dash
            ctx.setLineDash([]);
        }
    }
}