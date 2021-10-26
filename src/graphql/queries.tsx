import { gql } from '@apollo/client'

export const GET_CATEGORY_QUERY = gql`
  query MyQuery {
    category(order_by: {order: asc}) {
      name
      gradient
    }
  } 
`;

export const GET_PRODUCTS_QUERY = gql`
  query MyQuery {
    product {
      name
      id
      hate
      description 
      price
      path_image
      category {
        name
      }
    }
  } 
`;


export const GET_USERS_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      zipCode
      street
      state
      phone
      number
      neighbourhood
      name
      email
      city
      paymentMethods {
        nameOwner
        number
        valid
        nickName
        user_uid
        type
        niceType
      }
      mainPaymentMethod {
        nameOwner
        niceType
        nickName
        number
        type
        valid
        user_uid
      }
    }
  } 
`;
