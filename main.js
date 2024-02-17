const canvas=document.getElementById("canvas");

canvas.width=200;

const ctx=canvas.getContext("2d");
const car=new Car(100,100,30,50);
car.draw(ctx);

animate();

function animate(){
    car.update();
    // set canvas height resets the canvas?
    // NOTE: constantly reset the canvas
    canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate)
}