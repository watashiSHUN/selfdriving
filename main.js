const canvas=document.getElementById("canvas");
const canvasWidth=200;
canvas.width=canvasWidth;

const ctx=canvas.getContext("2d");
const car=new Car(/*car center's x coordinate*/canvasWidth/2,/*car center's y coordinate*/100,30,50);
// Leave some margin for the road
const road = new Road(/*x coordinate*/canvasWidth/2,/*width*/canvasWidth*0.9);

animate();

function animate(){
    car.update();
    // set canvas height resets the canvas?
    // NOTE: constantly reset the canvas
    canvas.height=window.innerHeight;
    // Draw the road first, so that the car can be drawn on top of it (crossing the lanes)
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate)
}