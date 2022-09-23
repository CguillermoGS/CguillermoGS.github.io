let formulario = document.getElementById("formulario");
let tarea = document.getElementById("tarea");
let listaTareas = document.getElementById("listaTareas");

let arrayTareas = [];

let item = {
  tarea: "",
  estado: false,
};

function agregarTarea(texto) {
  item = {
    tarea: texto,
    estado: false,
  };
  arrayTareas.push(item);
}
/*agregarTarea("comer");
agregarTarea("beber");
console.log(arrayTareas);
*/

formulario.onsubmit = function (e) {
  e.preventDefault();
  let textoTarea = tarea.value;
  agregarTarea(textoTarea);
  console.log(arrayTareas);
  tarea.value = "";
  GuardarBD();
};

function GuardarBD() {
  localStorage.setItem("tareas", JSON.stringify(arrayTareas));
  MostrarBD();
}

function MostrarBD() {
  let arrayTareas = [];
  listaTareas.innerHTML = "";
  arrayTareas = JSON.parse(localStorage.getItem("tareas"));
  arrayTareas.forEach((elemnt, index) => {
    if (elemnt.estado === true) {
      listaTareas.innerHTML += `
        <div class="alert alert-primary" role="alert">
        <i class="fa fa-list" aria-hidden="true"></i>
        <strong>${elemnt.tarea}</strong>--${elemnt.estado}
        <span class="float-right">
            <i class="fa fa-check" aria-hidden="true"></i>
            <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
        </div>
        `;
    } else {
      listaTareas.innerHTML += `
            <div class="alert alert-danger" role="alert">
            <i class="fa fa-list" aria-hidden="true"></i>
            <strong>${elemnt.tarea}</strong>--${elemnt.estado}
            <span class="float-right">
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
            </div>
            `;
    }
  });
}

listaTareas.onclick = function (e) {
  e.preventDefault();
  //console.log(e.target.classList[1]);
  if (
    e.target.classList[1] === "fa-check" ||
    e.target.classList[1] === "fa-trash"
  ) {
    //console.log(e.target.classList[1]);
    let nombreTarea =
      e.target.parentNode.parentNode.querySelector("strong").innerHTML;
    //console.log(nombreTarea);
    if (e.target.classList[1] === "fa-trash") {
      eliminarDB(nombreTarea);
    } else {
      editarDB(nombreTarea);
    }
  }
};
function eliminarDB(nombreTarea) {
  arrayTareas.forEach((elemento, index) => {
    if (elemento.tarea == nombreTarea) {
      arrayTareas.splice(index, 1);
    }
  });
  GuardarBD();
}

function editarDB(nombreTarea) {
  for (var i = 0; i < arrayTareas.length; i++) {
    if (arrayTareas[i].tarea === nombreTarea) {
      arrayTareas[i].estado = true;
    }
  }
}

MostrarBD();
