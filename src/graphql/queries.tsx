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
