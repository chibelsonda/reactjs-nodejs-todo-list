import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../mutations/taskMutations";
import { GET_TASKS } from "../../queries/taskQueries";
import { useSelector } from "react-redux";

export default function TaskRow({ task }) {
  const user = useSelector((state) => state.user.user);

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id: task.id },
    refetchQueries: [
      {
        query: GET_TASKS,
        variables: { userId: user.id },
      },
    ],
  });

  return (
    <tr>
      <td>{task.note}</td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={deleteTask}>
          <FaTrash className="icon" /> Delete
        </button>
      </td>
    </tr>
  );
}
