import Swal from 'sweetalert2';

const handleEditClick = (id, navigate) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You are about to view or edit this item.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!'
  }).then((result) => {
    if (result.isConfirmed) {
      navigate(`/user/editGroup/${id}`);
    }
  });
};

export default handleEditClick;
