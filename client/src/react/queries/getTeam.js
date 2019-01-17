
import gql from "graphql-tag";

export default  gql`
    query ($id: Int!){
        getTeam(id: $id){
            id
            name
            insight
            tags
            channels{
                id
                name
            }
        }
    }
`;

