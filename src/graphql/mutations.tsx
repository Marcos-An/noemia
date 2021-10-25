import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($users: users_insert_input!) {
    insert_users_one(object: $users) {
      uid
      name
      email
      phone
    }
  } 
`;