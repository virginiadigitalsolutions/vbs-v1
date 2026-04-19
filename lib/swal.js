import Swal from 'sweetalert2'

/**
 * Themed SweetAlert2 instance for the VBS Admin panel.
 * Provides consistent, premium-looking alerts across the entire project.
 */
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
    },
    customClass: {
        popup: 'swal-toast-custom',
    }
})

/**
 * Show a success toast notification
 */
export function showSuccess(message) {
    return Toast.fire({
        icon: 'success',
        title: message,
    })
}

/**
 * Show an error alert (non-toast, centered)
 */
export function showError(message) {
    return Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: message,
        confirmButtonColor: '#4873AE',
        customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            confirmButton: 'swal-btn-custom',
        }
    })
}

/**
 * Show a warning/info alert
 */
export function showWarning(message) {
    return Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
        confirmButtonColor: '#4873AE',
        customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            confirmButton: 'swal-btn-custom',
        }
    })
}

/**
 * Show a confirmation dialog (e.g. before delete)
 * Returns true if confirmed, false otherwise.
 */
export async function showConfirm({ title = 'Are you sure?', text = '', confirmText = 'Yes, proceed', cancelText = 'Cancel', icon = 'warning' } = {}) {
    const result = await Swal.fire({
        icon,
        title,
        text,
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true,
        customClass: {
            popup: 'swal-popup-custom',
            title: 'swal-title-custom',
            confirmButton: 'swal-btn-custom',
            cancelButton: 'swal-btn-cancel-custom',
        }
    })
    return result.isConfirmed
}

/**
 * Show an info toast notification
 */
export function showInfo(message) {
    return Toast.fire({
        icon: 'info',
        title: message,
    })
}

export { Swal }
export default Swal
