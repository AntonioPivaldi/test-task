export default `
query($userLogin: String!) {
  user: repositoryOwner(login: $userLogin) {
    repositories(
      first: 100
      ownerAffiliations: OWNER
    ) {
      nodes {
        name
      }
    } 
  } 
}
`