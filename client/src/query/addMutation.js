import { gql } from "@apollo/client";

export const CREATE_LAB = gql`
  mutation createLab($input: LabInput!) {
    createLab(input: $input) {
      subject
      number
      status
      deadline
      attach
      time
    }
  }
`;
