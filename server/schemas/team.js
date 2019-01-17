export default `
  type Team {
    id: Int!
    name: String!
    insight: String!
    tags: String!
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }
  type CreateTeamResponse {
    ok: Boolean!
    team: Team!
    errors: [Error!]
  }
  type Query {
    allTeams: [Team!]!
    allUsersAllTeams: [Team!]!
    getTeams(id: Int!): [Team!]
    getTeam(id: Int!): Team
  }

  type VoidResponse{
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createTeam(name: String!, insight: String!, tags: String!): CreateTeamResponse!
    createTeamWithChannel(name: String!, insight: String!, channelname: String!, tags: String!): CreateTeamResponse!
    addTeamMember(teamId: Int!): VoidResponse!
    
    updateTeamWithChannel(id: Int!, name: String!, insight: String!, channelname: String!, tags: String!): CreateTeamResponse!
  }
`;