import { gql } from "@apollo/client";

export const DELETE_LAB = gql`
  mutation deleteLab($time: String!) {
    deleteLab(time: $time) {
      subject
      number
      status
      deadline
      attach
      time
    }
  }
`