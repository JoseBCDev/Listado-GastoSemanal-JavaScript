//Variables y Selectores

const formulario = document.querySelector('#agregar-gasto');

const gastoListado = document.querySelector('#gastos ul');


//Eventos

eventListener();

function eventListener(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

    formulario.addEventListener('submit',agregarGasto);
}





//Classes

class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = presupuesto;
        this.gastos = [];
    }

    nuevoGasto(gastos)
    {
        this.gastos = [...this.gastos,gastos];
        console.log(this.gastos);
    }
}

class UI{

        insertarPresupuesto(cantidad)
        {
           const {presupuesto,restante} = cantidad;

           document.querySelector('#total').textContent = presupuesto;
           document.querySelector('#restante').textContent = restante;
        }

        imprimirAlerta(mensaje,tipo){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center','alert');

            if(tipo === 'error')
            {
                divMensaje.classList.add('alert-danger');
            }else{
                 divMensaje.classList.add('alert-success');
            }

            divMensaje.textContent = mensaje;

            document.querySelector('.primario').insertBefore(divMensaje,formulario);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
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

function agregarGasto(e){
    e.preventDefault();
    
    const gasto = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;
    
    if(gasto === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios','error');
        return;
    }else if(gasto <=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no Válida','error');
        return;
    }

    const gastos = {
        gasto,
        cantidad,
        id : Date.now()
    }

    presupuesto.nuevoGasto(gastos);

    ui.imprimirAlerta('Gasto Agregado Correctamente');
    formulario.reset();
}