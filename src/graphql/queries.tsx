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
      description 
      price
      path_image
      category {
        name
      }
    }
  } 
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: Int!) {
    product(where: {id: {_eq: $id}}) {
      id
      name
      path_image
      price
      description
      category {
        name
      }
    }
  } 
`;

//USER INFORMATIONS 
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
      cart {
        id
        description
        name
        observation
        path_image
        price
        priceBySize
        quantity
        size 
        type
      }
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

export const GET_USER_MAIN_PAYMENT_BY_UID = gql`
  query getUserMainPayment($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      name
      mainPaymentMethod {
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

export const GET_USER_NAME_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      name
      cart {
        id
        description
        name
        observation
        path_image
        price
        priceBySize
        quantity
        size 
        type
      }
    }
  } 
`;

export const GET_USER_EMAIL_PHONE_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      name 
      phone
      email
    }
  } 
`;

export const GET_USER_ADDRESS_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      zipCode
      street
      state 
      number
      neighbourhood 
      city
    }
  } 
`;

export const GET_USER_PAYMENT_METHOD = gql` 
 query MySubscription($uid: String!) {
    users {
      paymentMethods(where: {user_uid: {_eq: $uid}}) {
        valid
        type
        number
        nickName
        niceType
        nameOwner
      }
    }
  } 
`;


export const GET_USER_ADDRESS_PAYEMENT_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      uid
      zipCode
      street
      state 
      number
      neighbourhood 
      city
      paymentMethods{
        valid
        type
        number
        nickName
        niceType
        nameOwner
      }
    }
  } 
`;

// USER CART 

export const GET_USERS_BY_UID_CART = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      cart {
        id
        type
        description
        name
        observation
        path_image
        price
        priceBySize
        quantity
        size 
      }
    } 
  }
`;

export const GET_CART_BY_UID = gql`
  query getUser($uid: String!) { 
    users(where: {uid: {_eq: $uid}}) {
      cart {
        id
        type
        description
        name
        observation
        path_image
        price
        priceBySize
        quantity
        size 
      }
    } 
  }
`;
