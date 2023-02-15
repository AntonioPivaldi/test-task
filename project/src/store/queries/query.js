export default `
query($userLogin: String!) {
  user: repositoryOwner(login: $userLogin) {
    repositories(
      last: 100
      ownerAffiliations: OWNER
    ) {
      nodes {
        name
        issues(last: 20) {
          edges {
            node {
              title
              state
              bodyText
              comments(last: 20) {
                edges {
                  node {
                    bodyText
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    } 
  } 
}
`