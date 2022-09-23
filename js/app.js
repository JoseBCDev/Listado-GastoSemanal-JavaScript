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

    nuevoGastos(gastos)
    {
        this.gastos = [...this.gastos,gastos];
       this.calcularRestante();
    }

    calcularRestante()
    {
        const gastado = this.gastos.reduce((total,gastos)=> total + gastos.cantidad,0);
        this.restante = this.presupuesto - gastado;
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

        agregarGastoListado(gastoObj)
            {
                this.limpiarHTML();

                gastoObj.forEach(gastoA => {
                    
                    const {gasto,cantidad,id} = gastoA;


                    const nuevoGasto = document.createElement('li');
                    nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
                    nuevoGasto.dataset.id = id;
                    nuevoGasto.innerHTML = `${gasto} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

                    const btnBorrar = document.createElement('button');
                    btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
                    btnBorrar.innerHTML = `Borrar &times;`;

                    nuevoGasto.appendChild(btnBorrar);

                    gastoListado.appendChild(nuevoGasto);
                    

                });
                
            }

        limpiarHTML()
            {
                while (gastoListado.firstChild) {
                    gastoListado.removeChild(gastoListado.firstChild);
                }
            }
       actualizarRestante(restante)
        {
            document.querySelector('#restante').textContent = restante;
        }
        
        comprobarPresupuesto(presupuestoObj)
        {
            const {presupuesto,restante} = presupuestoObj;
            
            const restanteDiv = document.querySelector('.restante');

            if((presupuesto/4) > restante)
            {
                restanteDiv.classList.remove('alert-success','alert-warning');
                restanteDiv.classList.add('alert-danger');
            }else if((presupuesto/2) > restante){
                restanteDiv.classList.remove('alert-success');
                restanteDiv.classList.add('alert-warning');
            }

            if(restante<0)
            {
                this.imprimirAlerta('El presupuesto se ha agotado','error')
                formulario.querySelector('button[type="submit"]').disabled = true;
            }
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
    const cantidad = Number(document.querySelector('#cantidad').value);
    
    if(gasto === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios','error');
        return;
    }else if(gasto <=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no Válida','error');
        return;
    }

    const gastoObj = {
        gasto,
        cantidad,
        id : Date.now()
    }

    presupuesto.nuevoGastos(gastoObj);

    ui.imprimirAlerta('Gasto Agregado Correctamente');
    formulario.reset();

    const {gastos,restante} = presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}