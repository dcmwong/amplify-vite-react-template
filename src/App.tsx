import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import React from "react";
import { uploadData } from "aws-amplify/storage";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { signOut, user } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  const [file, setFile] = React.useState<any>({ name: '' });

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <main>
      <h1>{user ? `Hey ${user.signInDetails?.loginId}` : `Not signed in`}</h1>

      <button onClick={signOut}>Sign out</button>
      <br />
      <br />
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <input type="file" onChange={handleChange} />
      <button
        onClick={() =>
          uploadData({
            path: `picture-submissions/${file.name}`,
            data: file,
            options: {
              contentType: "image/png", // contentType is optional
            },
          })
        }
      >
        Upload
      </button>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
