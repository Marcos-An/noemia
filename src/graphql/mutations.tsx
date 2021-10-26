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

export const UPDATE_USER = gql`
  mutation updateUsers($uid: String!,$name: String!,$email: String!, $phone: String!) {
    update_users(where: {uid: {_eq: $uid}}, _set: {name: $name, email: $email, phone: $phone}) {
      returning { 
        email 
        name 
        phone 
      }
    }
  } 
`;

export const UPDATE_USER_ADDRESS = gql`
  mutation updateAddress($uid: String!, $city: String!, $neighbourhood: String!, $number: String!, $street: String!, $state: String!, $zipCode: String!) {
    update_users(where: {uid: {_eq: $uid}}, _set: {street: $street, city: $city, state: $state neighbourhood: $neighbourhood, number: $number, zipCode: $zipCode}) {
      returning {
        city  
        state
        neighbourhood
        number 
        street 
        zipCode
      }
    }
  } 
`;