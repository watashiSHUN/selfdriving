const canvas=document.getElementById("canvas");
const canvasWidth=200;
canvas.width=canvasWidth;

const ctx=canvas.getContext("2d");
// Leave some margin for the road
const road = new Road(/*x coordinate*/canvasWidth/2,/*width*/canvasWidth*0.9);
const car=new Car(/*car center's x coordinate*/road.getLaneCenter(1),/*car center's y coordinate*/100,30,50);

animate();

function animate(){
    car.update();
    // set canvas height resets the canvas?
    // NOTE: constantly reset the canvas
    canvas.height=window.innerHeight;

    ctx.save();
    // Move canvas' Y axis
    // move canvas by -Y
    // when draw car at Y => basically draw at zero
    ctx.translate(0,-car.y+canvas.height*0.7);

    // Draw the road first, so that the car can be drawn on top of it (crossing the lanes)
    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate)
}