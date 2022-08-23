export function Register (Key) {
    const $register = document.getElementById("@register"),
    node = document.importNode($register.content, true);
    
    document.body.appendChild(node);
    const $form = document.User;
    setTimeout(()=> $form.className = "visible", 100);
    
    $form.onsubmit = ev => {
        ev.preventDefault();
        // el objeto principal del usuario.
        // 
        let User = {};
        let $message = null;
        let Pnames = /^[a-zA-Z]{3,}\s([a-zA-Z]{3,})+$/;
        let Pemail = /^[a-zA-Z]\w{3,}\@(gmail|hotmail|codevelp|education)\.(com|org|pro)+/;

        // validando los nombres del usuario para almacenarlo.
        if($form.names.value == "") {
            $message = $form.names.nextElementSibling;
            $message.textContent = "El campo donde deberia introducir tus nombres esta vasio!";
            $message.classList.add("err");
            setTimeout(()=>{
                $message.classList.remove("err");
                $message.textContent = "";
            }, 3050);
            
        }
        else if (!Pnames.test($form.names.value)) {
            $message = $form.names.nextElementSibling;
            $message.textContent = "Por favor escribe tu nombre y apellidos, tambien no debe de tener ningún dígito numerico. Ejemplo: Edwin Silvestre PRO";
            $message.classList.add("warn");
            setTimeout(()=>{
                $message.classList.remove("warn");
                $message.textContent = "";
            }, 5050);
        }
        // validando el Email del usuario para almacenarlo
        else if ($form.email.value == "") {
            
            $message = $form.email.nextElementSibling;
            $message.textContent = "El campo donde deberia introducir tu correo electrónico esta vasio!";
            $message.classList.add("err");
            setTimeout(()=>{
                $message.classList.remove("err");
                $message.textContent = "";
            }, 3050);
        }
        else if (!Pemail.test($form.email.value)) {
            $message = $form.email.nextElementSibling;
            $message.textContent = "Tu correo electronico esta mal escrito, para que sea valido tiene que cumplir con lo siguiente: nombreusuario + numeros? + @ + gmail + .com + .org? + .pro? (el simbolo \"?\" significa que es opcional)"; 
            $message.classList.add("warn");
            setTimeout(()=>{
                $message.classList.remove("warn");
                $message.textContent = "";
            }, 10050);
        }
        else {
            User.names = $form.names.value;
            User.email = $form.email.value;
            
            localStorage.setItem(Key, JSON.stringify(User));

            document.body.removeChild(ev.target.parentElement);

            window.dispatchEvent(new Event("startGame"))
        }
    }
    
}