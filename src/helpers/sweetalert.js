import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

/**
  Se muestra una alerta para confirmar el borrado de un elemento.

    @param {string} title titulo que se aplica al mostrar la alerta.
    @param {function} remove función que elimina el elemento.
*/
export function confirmDelete(title, remove) {
    Swal.fire({
        background: 'var(--color-background-inputs)',
        color: 'white',
        icon: 'error',
        title,
        text: 'Esta acción no se puede deshacer',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: "#DC3545",
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            remove();
        }
    });
}

export function creatingUser() {
    let timerInterval
    Swal.fire({
        background: 'var(--color-background-inputs)',
        color: 'white',
        icon: 'success',
        title: 'Creando usuario...',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}