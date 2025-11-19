import "./index.css";
import { useState } from "react";
export default function TodoListItem(props) {
  const { id, title, completed, handleChecked, handleDelete, handleEdit } =
    props;
  const [isEdit, setIsEdit] = useState(false);
  const onChange = (e) => {
    handleChecked(e.target.checked, id);
  };
  const emitDelete = (id) => {
    handleDelete(id);
  };
  const handleDoubleClick = () => {
    setIsEdit(true);
  };
  const emitEditValue = (e) => {
    handleEdit(id, e.target.value);
    setIsEdit(false);
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onDoubleClick={handleDoubleClick}
    >
      <input
        type="checkbox"
        name={`todo-${id}`}
        id={`todo-${id}`}
        checked={completed}
        onChange={onChange}
      />
      <span className={completed ? "line-through" : ""}>
        {isEdit ? (
          <input type="text" defaultValue={title} onBlur={emitEditValue} />
        ) : (
          title
        )}
      </span>
      <button onClick={() => emitDelete(id)}>x</button>
    </div>
  );
}
