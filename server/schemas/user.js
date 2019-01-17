module.exports = `

    type User {
        id: Int!
        firstname: String
        lastname: String
        bio: String
        email: String!
        password: String
        role: String
    }

    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }

    type CreateUserResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        ok: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
    }

    type Mutation {
        createUser(firstname: String!, lastname: String!, bio: String!, email: String!,password: String!,role: String!): CreateUserResponse!
        register(email: String!, password: String!): Boolean!
        login(email: String!, password: String!): LoginResponse!
    }

`;
