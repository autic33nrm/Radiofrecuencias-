import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

const Refrescos = document.querySelector('.Refrescos');
const FormularioActualizarRefresco = document.querySelector('#Formulario-ActualizarRefresco');

const obtenerRefresco = (id) => getDoc(doc(db, 'Refrescos', id));

let id = '';

// Nueva función para actualizar refresco
const actualizarRefresco = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Refrescos', id), nuevosValores);
        alert('Refresco actualizado correctamente');
    } catch (error) {
        alert('Error al actualizar el refresco', 'error');
    }
};

export const MostrarListaRefrescos = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Refresco = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="custom-list-group-item custom-list-group-item-action">
                    <h5> Nombre del refresco: ${Refresco.Nombre} </h5>
                    <p> Marca: ${Refresco.Marca} </p>
                    <p> Fabricante: ${Refresco.Fabricante} </p>
                    <p> Fecha de Caducidad: ${Refresco.FechaCaducidad} </p>
                    <button class="btn btn-warning w-100 mb-2 botoneSinSesion Eliminar-Refresco" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-success w-100 mb-2 botoneSinSesion Actualizar-Refresco" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarRefresco"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Refrescos.innerHTML = html;

        const BotonesEliminar = Refrescos.querySelectorAll('.Eliminar-Refresco');

        // ELIMINAR REFRESCOS
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Refrescos', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    alert('Error al eliminar el refresco:', 'error');
                }
            });
        });

        const BotonesActualizar = Refrescos.querySelectorAll('.Actualizar-Refresco');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerRefresco(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarRefresco['Actualizar-Nombre'];
                const MARCA = FormularioActualizarRefresco['Actualizar-Marca'];
                const FABRICANTE = FormularioActualizarRefresco['Actualizar-Fabricante'];
                const FECHA_CADUCIDAD = FormularioActualizarRefresco['Actualizar-FechaCaducidad'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre;
                MARCA.value = DATOSDOCUMENTO.Marca;
                FABRICANTE.value = DATOSDOCUMENTO.Fabricante;
                FECHA_CADUCIDAD.value = DATOSDOCUMENTO.FechaCaducidad;

                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar el refresco al enviar el formulario
        FormularioActualizarRefresco.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarRefresco['Actualizar-Nombre'].value;
                const MARCA = FormularioActualizarRefresco['Actualizar-Marca'].value;
                const FABRICANTE = FormularioActualizarRefresco['Actualizar-Fabricante'].value;
                const FECHA_CADUCIDAD = FormularioActualizarRefresco['Actualizar-FechaCaducidad'].value;

                await actualizarRefresco(id, {
                    Nombre: NOMBRE,
                    Marca: MARCA,
                    Fabricante: FABRICANTE,
                    FechaCaducidad: FECHA_CADUCIDAD,
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarRefresco');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                alert(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Refrescos.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
