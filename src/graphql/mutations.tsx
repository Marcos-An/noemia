import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($users: users_insert_input!) {
    insert_users_one(object: $users) {
      id
      city
      email
      mainPaymentMethod {
        nameOwner
        niceType
        nickName
        number
        type
        user_uid
        valid
      }
      name
      neighbourhood
      number
      paymentMethods {
        nameOwner
        niceType
        nickName
        number
        type
        user_uid
        valid
      }
      phone
      state
      street
      uid
      zipCode
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

export const CREATE_USER_PAYMENT_METHOD = gql`
  mutation updatePaymentMethods($paymentMethod: paymentMethod_insert_input! ) {
    insert_paymentMethod_one(object: $paymentMethod) {
      nameOwner
      niceType
      number
      type
      user_uid
      valid
      nickName
    }
  } 
`;

export const UPDATE_USER_PAYMENT_METHOD = gql`
  mutation updatePaymentMethodMutation($uid: String!, $nickName: String!) {
    update_paymentMethod(where: {user_uid: {_eq: $uid}}, _set: {nickName: $nickName}) {
      returning {
        nameOwner
        niceType
        nickName
        number
        type
        user_uid
        valid
      }
    }
  } 
`;

export const REMOVE_USER_PAYMENT_METHOD = gql`
  mutation updatePaymentMethods($number: String!) {
    delete_paymentMethod(where: {number: {_eq: $number}}) {
      returning {
        number
        user_uid
      }
    }
  } 
`;