import {gql} from "@apollo/client"

export const GET_LABS = gql`
query{
    getLabs{
      subject,
      number,
      status,
      deadline,
      attach,
      time
    }
  }
`