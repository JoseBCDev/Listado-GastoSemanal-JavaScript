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

//Clase Presupuesto
class Presupuesto{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = presupuesto;
        this.gastos = [];
    }
//Agregar nuevo Gasto a la lista
    nuevoGastos(gastos)
    {
        this.gastos = [...this.gastos,gastos];
       this.calcularRestante();
    }
//Calcula el Resto de lo que se va gastando
    calcularRestante()
    {
        const gastado = this.gastos.reduce((total,gastos)=> total + gastos.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }
//Elimina un Gasto de acuerdo al boton
    eliminarGasto(id)
    {
    //Filtra todo el array gasto y se qedan todos los q sean diferentes al ID
        this.gastos = this.gastos.filter(gasto=>gasto.id != id);
        this.calcularRestante();
    }
}
//Clase para Diseño
class UI{
//Permite ver el presupuesto y el Restante en la lista
        insertarPresupuesto(cantidad)
        {
           const {presupuesto,restante} = cantidad;

           document.querySelector('#total').textContent = presupuesto;
           document.querySelector('#restante').textContent = restante;
        }
//Imprime una alerta por cada ingreso de datos o error de validaciones
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
//Muestra los gastos Listados
        mostrarGasto(gastoObj)
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
                    btnBorrar.onclick = ()=>{
                       eliminarGasto(id); 
                    };
                    btnBorrar.innerHTML = `Borrar &times;`;

                    nuevoGasto.appendChild(btnBorrar);

                    gastoListado.appendChild(nuevoGasto);
                    

                });
                
            }
//Limpia la lista de los Gastos en cola
        limpiarHTML()
            {
                while (gastoListado.firstChild) {
                    gastoListado.removeChild(gastoListado.firstChild);
                }
            }
//Muestra cuanto queda de Presupuesto
       actualizarRestante(restante)
        {
            document.querySelector('#restante').textContent = restante;
        }
//Comprueba si el Presupuesto se encuentra dentro del rango a traves de colores       
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
            }else{
                restanteDiv.classList.remove('alert-warning','alert-danger');
                restanteDiv.classList.add('alert-success');
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
//Pregunta el Presupuesto al inicio de  ingresar a la pagina
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario <=0 || isNaN(presupuestoUsuario) || presupuestoUsuario === null)
    {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}
//Agrega un gasto al Array Objeto Gastos[]
function agregarGasto(e){
    e.preventDefault();
    
    const gasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    //valida que los datos no esten vacios
    if(gasto === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son Obligatorios','error');
        return;
    }else if(gasto <=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no Válida','error');
        return;
    }
    //creacion de objeto literal
    const gastoObj = {
        gasto,
        cantidad,
        id : Date.now()
    }
    //Agregando el nuevo gasto en la lista
    presupuesto.nuevoGastos(gastoObj);
    //imprimiendo alerta de exito
    ui.imprimirAlerta('Gasto Agregado Correctamente');
    formulario.reset(); //reinciando formulario
    //destructuring al objeto presupuesto
    const {gastos,restante} = presupuesto;
    //Mostrando gasto en la lista
    ui.mostrarGasto(gastos);
    //Actualizando el restanto del presupuesto en pantalla
    ui.actualizarRestante(restante);
    //Comprobando si gasto mas de lo normal
    ui.comprobarPresupuesto(presupuesto);
}
//Eliminar un gasto cada click en el boton
function eliminarGasto(id)
{
    //Eliminar el gasto
    presupuesto.eliminarGasto(id);

    //Destructuring al objeto
    const {restante,gastos} = presupuesto;
    //Muestra los gastos
    ui.mostrarGasto(gastos);
    //Actualiza
    ui.actualizarRestante(restante);
    //Verifica
    ui.comprobarPresupuesto(presupuesto);
}