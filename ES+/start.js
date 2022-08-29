export function viewInterface (e) {
    const Nodes = document.importNode(
        document.getElementById("@start")
        .content
    , true);
        document.body.parentElement.removeAttribute("class");
        document.body.classList.add("start")
        document.body.appendChild(Nodes);
        document.body.id = "";
/* 
aqui voy a escribir codigo para que 
se vea el paisaje del juego.
*/
const Cars = {
    car1 : (()=> {
        const car = new Image(200, 150);
        car.src = './images/car_1m.png';
        return car;
    })(),
    car2 : (()=> {
        const car = new Image(200, 150);
        car.src = './images/car_2m.png';
        return car;
    })(),
    car3 : (()=> {
        const car = new Image(200, 150);
        car.src = './images/car_3m.png';
        return car;
    })()
},
paisaje = new Image(600, 550),
COLORS = ["red", "blue", "orange", "yellow", "cyan", "transparet", "gray", "green", "black", "#444444"];
paisaje.src = './images/panel.png';
let offsetDash = 1, indexColor = 0, isChangeCar = true, keyCar = ()=> {
    const Us = JSON.parse(localStorage.getItem("@User"));
    if("typecar" in Us) return Us["typecar"];
    else return "car1";
},
translateX = -150;
let intervalColors = setInterval(()=> {

    if(indexColor < COLORS.length) indexColor++;
    else indexColor = 0;
}, 1000);

paisaje.onload = e => Draw();

function Draw () {
    const $paisaje = document.querySelector("canvas#paisaje");
    $paisaje.width = 600;
    $paisaje.height = 550;

    let ctx = $paisaje.getContext('2d');
    ctx.clearRect(0, 0, $paisaje.width, $paisaje.height);
    ctx.globalCompositeOperation = "source-over";
    let sun = ctx.createRadialGradient(60, 60, 20, 60, 60, 80);
    sun.addColorStop(0.86, "yellow");
    sun.addColorStop(0.00208, "orange");
    // fondo...
    ctx.drawImage(paisaje, 0, 0, 600, 550, 0, 0, $paisaje.width, $paisaje.height);
    // the house
    ctx.fillStyle = "purple";
    ctx.fillRect(10, 172, 100, 160);
    
    ctx.lineWidth = 6;
    ctx.strokeStyle = "purple";
    ctx.setLineDash([10, 14]);
    ctx.lineDashOffset = offsetDash;

    if(offsetDash == 560) offsetDash = -6;
    else offsetDash++;

    ctx.strokeRect(10, 172, 100, 160);
    ctx.setLineDash([0, 0]);

    ctx.fillStyle = COLORS[indexColor];
    ctx.fillRect(15, 200, 18, 16);
    ctx.fillRect(82, 200, 18, 16);
    ctx.fillRect(50, 240, 20, 22);
    ctx.fillRect(15, 280, 18, 16);
    ctx.fillRect(82, 280, 18, 16);
    ctx.fillStyle = "gray";
    ctx.fillRect(46, 298, 28, 30);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(52, 312, 4, 0, Math.PI*2, false);

    // the sun...
    ctx.fillStyle = sun;
    ctx.arc(60, 60, 50, Math.PI*2, false);
    ctx.closePath();
    
    ctx.fill();
    // the cars manifestation...
    
        let car = Cars[keyCar()];
        ctx.drawImage(car, 0, 0, car.width, car.height, translateX, 380, 135, 100);

    if(isChangeCar) {
        translateX++;
        if(translateX == 60) isChangeCar = false;
    }

    let Anim = window.requestAnimationFrame(Draw);
}

}
