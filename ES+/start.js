export function viewInterface (e) {
    const Nodes = document.importNode(
        document.getElementById("@start")
        .content
    , true);
        document.body.parentElement.removeAttribute("class");
        document.body.classList.add("start")
        document.body.appendChild(Nodes);
        document.body.id = "";


}