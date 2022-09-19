//Variables y Selectores

const formulario = document.querySelector('#agregar-gasto');

const gastoListado = document.querySelector('#gastos ul');


//Eventos

eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
}





//Classes






//Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es presupuesto?');
    console.log(isNaN(presupuestoUsuario));
    if(presupuestoUsuario === '' || presupuestoUsuario <=0 || isNaN(presupuestoUsuario) || presupuestoUsuario === null)
    {
        window.location.reload();
    }
}