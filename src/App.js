import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ...DEFAULT_STATE, query: event.target.value });
  }

  render() {
    const { query, first, after, before, last } = this.state;
    console.log({ query });
    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange} />
        </form>
        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            const search = data.search;
            const repositoryCount = search.repositoryCount;
            const repositoryUnit =
              repositoryCount === 1 ? "Repository" : "Repositories";
            const title = `GITHUB REPOSITORIES SEARCH RESULTS - ${repositoryCount} ${repositoryUnit}`;
            return <h2>{title}</h2>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
