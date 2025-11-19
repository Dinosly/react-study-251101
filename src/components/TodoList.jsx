import TodoListItem from "./TodoListItem.jsx";
import { useState, useEffect } from "react";
export default function TodoList() {
  const [showTodo, setShowTodo] = useState(true);
  // 组件初始化时，从localStorage中获取数据
  // 区别于vue在mounted时获取数据
  const [data, setData] = useState(() => {
    const savedTodos =
      localStorage.getItem("todoList") ??
      JSON.parse(localStorage.getItem("todoList"));

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todoListItemName, setTodoListItemName] = useState("");
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(data));
  }, [data]);

  const handleChecked = function (v, i) {
    // 创建数组的副本
    const newData = [...data];
    // 在副本上更新数据
    const index = data.findIndex((item) => item.id === i);
    newData[index].completed = v;
    // 设置新的state
    setData(newData);
  };
  const handleDelete = function (id) {
    setData(data.filter((item) => item.id !== id));
  };
  const handleEdit = function (id, v) {
    const newData = [...data];
    newData.forEach((item) => {
      if (item.id === id) {
        item.title = v;
      }
    });
    setData(newData);
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
              handleEdit={handleEdit}
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
