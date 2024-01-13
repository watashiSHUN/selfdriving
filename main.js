const canvas=document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=200;

const ctx=canvas.getContext("2d");
const car=new Car(100,100,30,50);
car.draw(ctx);

animate();

function animate(){
    car.update();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    car.draw(ctx);
    // what does this function do?
    requestAnimationFrame(animate)
}