import gql from "graphql-tag";

export default  gql`
 {
    allUsersAllTeams {
      id
      name
      insight
      tags
      owner {
        id
        firstname
        lastname
      }
      channels {
        id
        name
      }
    }
  }
`;

