import "./index.css";
export default function TodoListItem(props) {
  const { id, title, completed, index, handleChecked, handleDelete } = props;
  console.log(props);
  const onChange = (e) => {
    handleChecked(e.target.checked, index);
  };
  const emitDelete = (id) => {
    handleDelete(id);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        name={`todo-${id}`}
        id={`todo-${id}`}
        checked={completed}
        onChange={onChange}
      />
      <span className={completed ? "line-through" : ""}>{title}</span>
      <button onClick={() => emitDelete(id)}>x</button>
    </div>
  );
}
