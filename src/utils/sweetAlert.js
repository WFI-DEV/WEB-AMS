import Swal from 'sweetalert2'

export const inputNotComp = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please complete input the content!',
  })
}
