const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')

let filter = 'ALL'
const todos = [
  { id: '8rjijr9j9-9', text: 'shopping', completed: false }
]
const typeDefs = gql`
  enum FILTER {
    ALL
    COMPLETED
    ACTIVE
  }
  
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  
  type Query {
    allTodos: [Todo!]!
  }
  
  type Mutation {
    addTodo(text: String!): Todo!
    toggleCompleted(id: ID!): Todo!
    setFilter(filter: FILTER!): FILTER!
  }
`

const resolvers = {
  Query: {
    allTodos: () => {
      if (filter === 'ALL') {
        return todos
      }
      return todos.filter(todo => filter === 'COMPLETED' ? todo.completed : !todo.completed)
    }
  },
  Mutation: {
    addTodo: (root, args) => {
      const todo = { ...args, id: uuidv4(), completed: false }
      todos.push(todo)
      return todo
    },
    toggleCompleted: (root, args) => {
      const todo = todos.find(t => t.id === args.id)
      if (!todo) {
        throw new UserInputError('id not found', {
          invalidArgs: args.id,
        })
      }

      todo.completed = !todo.completed
      todos.map(t => t.id === todo.id ? todo : t)
      return todo
    },
    setFilter: (root, args) => {
      return filter = args.filter
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`server ready is ${url}`)
})
