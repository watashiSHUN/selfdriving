const carCanvas=document.getElementById("carCanvas");
const canvasWidth=200;
carCanvas.width=canvasWidth;
const carCtx=carCanvas.getContext("2d");

const networkCanvas=document.getElementById("networkCanvas");
const networkCanvasWidth=300;
networkCanvas.width=networkCanvasWidth;
const networkCtx=networkCanvas.getContext("2d");

// Leave some margin for the road
const road = new Road(/*x coordinate*/canvasWidth/2,/*width*/canvasWidth*0.9);
//const playerCar = new PlayerCar(/*car center's x coordinate*/road.getLaneCenter(1),/*car center's y coordinate*/100,30,50, speed=0, "black");
const aiCar = new AICar(road.getLaneCenter(0),100,30,50, speed=1, "black");
const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, 1, "green"),
]

animate();

function animate(){
    traffic.forEach(car => {
        car.update();
    });
    
    let obstacles = road.getBorders();
    traffic.forEach(car => {
        obstacles = obstacles.concat(connectPoints(car.polyGone));
    });

    aiCar.update(obstacles);
    // set canvas height resets the canvas?
    // NOTE: constantly reset the canvas
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    // Move canvas' Y axis
    // move canvas by -Y
    // when draw car at Y => basically draw at zero
    carCtx.translate(0,-aiCar.y+carCanvas.height*0.7);

    // Draw the road first, so that the car can be drawn on top of it (crossing the lanes)
    road.draw(carCtx);
    traffic.forEach(car => {
        car.draw(carCtx);
    });
    // Draw obstacles
    //drawLines(obstacles, ctx, "blue");
    aiCar.draw(carCtx);

    carCtx.restore();
    requestAnimationFrame(animate)
}