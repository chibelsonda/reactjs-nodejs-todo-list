import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CREATE_TASK } from "../../mutations/taskMutations";
import { GET_TASKS } from "../../queries/taskQueries";
import Spinner from "../Spinner";
import TaskRow from "./TaskRow";
import { useSelector } from "react-redux";

export default function Tasks() {
  const [note, setNote] = useState("");

  const user = useSelector((state) => state.user?.user);
  const userId = user?.id;

  const [createTask] = useMutation(CREATE_TASK, {
    variables: { userId, note },
    update(cache, { data: { createTask } }) {
      const { tasks } = cache.readQuery({
        query: GET_TASKS,
        variables: { userId },
      });

      cache.writeQuery({
        query: GET_TASKS,
        variables: { userId },
        data: { tasks: [...tasks, createTask] },
      });
    },
  });

  const { data, error, loading } = useQuery(GET_TASKS, {
    variables: { userId },
  });
  if (loading) return <Spinner />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (note === "") {
      return alert("Please enter a note.");
    }

    createTask(userId, note);

    setNote("");
  };

  return (
    <div className="container main mt-5 px-3">
      <div className="row">
        <div className="col-3">
          <h2 className="fw-ligther">Tasks</h2>
        </div>

        <div className="add-task col-12 col-md-9 ">
          <form
            onSubmit={onSubmit}
            className="d-flex flex-wrap justify-content-end"
          >
            <input
              type="text"
              className="form-control"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note"
              required
            />

            <button type="submit" className="btn btn-md primary-btn ms-2">
              <FaPlus className="icon" /> Add
            </button>
          </form>
        </div>
      </div>

      {!loading && !error && (
        <div className="row px-1">
          <div className="col-12 mt-2">
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col" className="w-75">
                    Note
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
