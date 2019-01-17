import gql from "graphql-tag";

export default  gql`
 {
    allTeams {
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

