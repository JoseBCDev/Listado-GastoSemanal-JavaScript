//Variables y Selectores

const formulario = document.querySelector('#agregar-gasto');

const gastoListado = document.querySelector('#gastos ul');


//Eventos

eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
}





//Classes

class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = presupuesto;
        this.gastos = presupuesto;
    }
}

class UI{

        insertarPresupuesto(cantidad)
        {
           const {presupuesto,restante} = cantidad;

           document.querySelector('#total').textContent = presupuesto;
           document.querySelector('#restante').textContent = restante;
        }

}

//Instanciar Objetos
const ui = new UI();

let presupuesto;


//Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario <=0 || isNaN(presupuestoUsuario) || presupuestoUsuario === null)
    {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}