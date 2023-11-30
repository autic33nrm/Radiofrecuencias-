import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioRefresco = document.querySelector('#Formulario-Refresco');

    formularioRefresco.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioRefresco['Nombre-Refresco'].value;
        const MARCA = formularioRefresco['Marca-Refresco'].value;
        const FABRICANTE = formularioRefresco['Fabricante-Refresco'].value;
        const FECHA_CADUCIDAD = formularioRefresco['FechaCaducidad-Refresco'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoRefrescoRef = await addDoc(collection(db, 'Refrescos'), {
                Nombre: NOMBRE,
                Marca: MARCA,
                Fabricante: FABRICANTE,
                FechaCaducidad: FECHA_CADUCIDAD
            });

            // Muestra un mensaje si todo sale bien
            alert(`El refresco ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioRefresco.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            alert('Error al registrar el refresco:', 'noValido');
        }
    });
});
