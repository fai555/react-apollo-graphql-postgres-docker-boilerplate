export default `
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }
  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }


  type Query {
    allUserAllChannels: [Channel]
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): ChannelResponse!
  }
`;