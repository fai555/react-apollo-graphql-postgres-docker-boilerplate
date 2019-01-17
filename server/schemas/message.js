export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
  }


  type Query {
    allUserAllMessages: [Message]
    getMessages(id: Int!): [Message!]
  }

  type MessageResponse {
    ok: Boolean!
    message: Message
    errors: [Error!]
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): MessageResponse!
    updateMessage(id: Int!, text: String!): MessageResponse!
  }
`;