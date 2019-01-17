
import gql from "graphql-tag";

export default  gql`
    query ($id: Int!){
        getMessages(id: $id){
            id
            text
            user{
                id
                firstname
                lastname
            }
        }
    }
`;

