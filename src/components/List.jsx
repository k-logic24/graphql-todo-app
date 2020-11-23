import React from 'react';
import { useApolloClient, gql } from '@apollo/react-hooks'
import {ALL_TODOS} from "../App";
const TOGGLE_COMPLETED = gql`
  mutation toggleCompleted($id: ID!) {
    toggleCompleted(id: $id) {
      id
      text
      completed
    }
  }
`

const List = ({ data, loading }) => {
  const client = useApolloClient()

  if (loading) {
    return <div className='font-bold text-lg'>Loading...</div>
  }

  const toggleCompleted = (id) => {
    client.mutate({
      mutation: TOGGLE_COMPLETED,
      variables: { id },
      refetchQueries: [{ query: ALL_TODOS }]
    })
  }

  return (
    <ul>
      {data && data.allTodos.map(({id, text, completed}) => (
        <li
          className='mb-4'
          key={id}
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
          {text}
          <button
            type='button'
            className='px-2 ml-4 border border-gray-400 rounded'
            onClick={() => toggleCompleted(id)}
          >
            DONE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
