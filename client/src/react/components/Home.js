import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import allTeamsQuery from '../queries/allTeams';


class Home extends Component {

    render() {
        return (
            <div>Test</div>
        )
    }
}

 
export default graphql(allTeamsQuery)(Home);
 