import Swal from 'sweetalert2'

export const addAssetsAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  })
}
