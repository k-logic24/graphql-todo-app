import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/react-hooks'
import Form from "./components/Form";
import List from "./components/List";
import DisplayBtn from "./components/DisplayBtn";

export const ALL_TODOS = gql`
  query {
    allTodos {
      id
      text
      completed
    }
  }
`
const ADD_TODOS = gql`
  mutation addTodo($text: String) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`
const SET_FILTER = gql`
  mutation setFilter($filter: FILTER) {
    setFilter(filter: $filter)
  }
`

const App = () => {
  const { loading, data } = useQuery(ALL_TODOS)
  const [addTodo] = useMutation(ADD_TODOS, {
    refetchQueries: [{ query: ALL_TODOS }]
  })
  const [setFilter] = useMutation(SET_FILTER, {
    refetchQueries: [{ query: ALL_TODOS }]
  })

  return (
    <>
      <header className='py-2 px-4 bg-purple-400'>
        <h1 className='text-white text-2xl'>React-todo with GraphQL</h1>
      </header>
      <main className="flex flex-col items-center my-12">
        <Form addTodo={addTodo} />
        <div className="py-12">
          <List {...{ loading, data }} />
        </div>
        <div className="flex gap-4">
          <DisplayBtn setFilter={setFilter}/>
        </div>
      </main>
    </>
  );
};

export default App;
