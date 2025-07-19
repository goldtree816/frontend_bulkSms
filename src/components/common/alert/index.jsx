import Swal from 'sweetalert2';
import axiosInstance from "../../../config/axios.config";

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/groups/${id}`);

      Swal.fire('Deleted!', 'Your group has been deleted.', 'success');

    } catch (error) {
      Swal.fire('Error!', 'Failed to delete the group.', 'error');
    }
  }
};

export default handleDelete;
