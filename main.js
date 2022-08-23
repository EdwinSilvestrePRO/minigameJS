import { Register } from './ES+/localData.js';
import { viewInterface } from './ES+/start.js';
window
.addEventListener("DOMContentLoaded", e=> 
{
/*
 Dentro del bloque try esta la lógica de 
 programacion para que este juego carge
 los recursos y la interfaz gráfica que
 indica cuanto es el porcentage de carga 
        (0% --------- 100%).

 El bloque catch captura el error que esta dentro de try.
*/
try {
    
    const $svg = document.getElementById("svgLoader"),
    $track = $svg.querySelector("#track"),
    $porcent = $svg.querySelector("#porcent");
    let repeat = null,
    wh = parseFloat($svg.dataset.width),
    chunck = 1;
    
    function increment () {
        const porcent = (wh/100);
        $track.setAttribute("width", porcent * chunck);

        $porcent.textContent = `${chunck}%`;
        
        if(porcent * chunck == wh) cancelAnimationFrame(repeat);
        else
        repeat = requestAnimationFrame(increment);
        if(chunck == 100) return false;
        chunck++;
        return true;
    }
    
    let blocking = 1,
   
    interval = setInterval(()=> {
        const state = !increment();
        if(state) {
            const loaded = new Event("loaded");

            document.dispatchEvent(loaded);
            clearInterval(interval);
        } else if(blocking == 1) repeat = requestAnimationFrame(increment);

        blocking = 4;
    }, Math.random () * 3500);
}

 catch (err) {
     alert(`Ocurrio un Error: ${err.message}\n\rEn la consola para mas detalles...`);
     console.error(err);
 } finally {

    document.addEventListener("loaded", ev=> {
        const User = localStorage.getItem("@User");
        if(User) window.dispatchEvent(new Event("startGame"));
        else Register("@User");
    });

 }
});
window
.addEventListener("startGame", ev=> {
    document.body.id = "hidden";
    document.body.classList.remove("load");
    document.body.removeChild(document.querySelector("header.loader"));
    setTimeout(viewInterface, 3000);
});

