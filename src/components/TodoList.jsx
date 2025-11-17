import TodoListItem from "./TodoListItem.jsx";
import { useState, useEffect } from "react";
export default function TodoList() {
  const [showTodo, setShowTodo] = useState(true);
  const [data, setData] = useState([
    {
      id: 1,
      title: "Todo 1",
      completed: false,
    },
    {
      id: 2,
      title: "Todo 2",
      completed: true,
    },
  ]);
  const [todoListItemName, setTodoListItemName] = useState("");
  useEffect(() => {}, data);
  const handleChecked = function (v, i) {
    // 创建数组的副本
    const newData = [...data];
    // 在副本上更新数据
    newData[i].completed = v;
    // 设置新的state
    setData(newData);
  };
  const handleDelete = function (id) {
    debugger;
    setData(data.filter((item) => item.id !== id));
  };
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <button
          onClick={() => setShowTodo(true)}
          className={showTodo ? "active" : ""}
        >
          {"待办"}
        </button>
        <button
          onClick={() => setShowTodo(false)}
          className={!showTodo ? "active" : ""}
        >
          {"已办"}
        </button>
      </div>

      <input
        type="text"
        value={todoListItemName}
        onChange={(e) => setTodoListItemName(e.target.value)}
      />
      <button
        onClick={() =>
          setData([
            ...data,
            {
              id: data.length + 1 + todoListItemName,
              title: todoListItemName,
              completed: false,
            },
          ])
        }
      >
        添加
      </button>
      <div style={{ display: showTodo ? "block" : "none" }}>
        {data
          .filter((i) => !i.completed)
          .map((item, index) => (
            <TodoListItem
              key={item.id}
              {...item}
              index={index}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      <div style={{ display: showTodo ? "none" : "block" }}>
        {data
          .filter((i) => i.completed)
          .map((item, index) => (
            <TodoListItem
              key={item.id}
              {...item}
              index={index}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}
