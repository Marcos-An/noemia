import { gql } from '@apollo/client'


//USER MUTATIONS 
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


// PAYMENT MUTATIONS 

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
  mutation updatePaymentMethodMutation($uid: String!, $nickName: String!, $number: String!) {
    update_paymentMethod(where: {user_uid: {_eq: $uid}, number: {_eq: $number}}, _set: {nickName: $nickName}) {
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

export const UPDATE_MAIN_METHOD = gql`
  mutation updateMainPaymentMethod($uid: String!, $paymentMethod: mainPaymentMethod_set_input!) {
    update_mainPaymentMethod(where: {user_uid: {_eq: $uid}}, _set: $paymentMethod ) {
      returning {
        user_uid
        nameOwner
        number
      }
    }
  } 
`;

export const REMOVE_USER_PAYMENT_METHOD = gql`
  mutation removePaymentMethodMutation($uid: String!, $number: String!) {
    delete_paymentMethod(where: {user_uid: {_eq: $uid}, number: {_eq: $number}}) {
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


//CART MUTATIONS
export const CREATE_USER_CART_ITEM = gql`
  mutation createUserCartItem($cartItem: userCart_insert_input!) {
    insert_userCart_one(object: $cartItem) {
      name
      description
      path_image
      observation
    }
  } 
`;

export const UPDATE_USER_CART_ITEM = gql`
  mutation updateUserCartItem($uid: String!, $id: Int!, $cartItem: userCart_set_input!) {
    update_userCart(where: {user_id: {_eq: $uid}, id: {_eq: $id}}, _set: $cartItem) {
      returning {
        name
        description
        path_image
        observation
      } 
    }
  } 
`;

export const REMOVE_USER_CART_ITEM = gql`
  mutation removeUserCartItem($uid: String!, $id: Int!) {
    delete_userCart(where: {id: {_eq: $id}, user_id: {_eq:$uid}}) {
      returning {
        name
        description
        path_image
        observation
      } 
    }
  } 
`;

