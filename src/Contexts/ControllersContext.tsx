import { createContext, useState, ReactNode } from 'react';
import _ from 'lodash'

type ControllersContextData = {
  selectedItemMenu: selectedItemMenu;
  addingCardItem: newCardItem;
  cartItems: Array<newCardItem>;
  headerText: string;
  footerType: string;
  paymentMethods: Array<paymentMethod>;
  mainPaymentMethod: paymentMethod;
  order: Array<order>;
  isLoading: boolean;
  updateSelectedItemMenu: (selectedItem: object) => void;
  updateAddingCartItem: (newCardItem: newCardItem) => void;
  updateMyCart: (newCardItem: newCardItem) => void;
  updateHeaderText: (text: string) => void;
  updateFooterType: (type: string) => void;
  removingItemFromCart: (selectedItem: newCardItem) => void;
  updatePaymentMethods: (paymentMethod: paymentMethod) => void;
  initializePaymentMethods: (paymentMethods: Array<paymentMethod>) => void;
  updateMainPaymentMethod: (paymentMethod: paymentMethod) => void;
  removingPaymentMethod: (paymentMethod: paymentMethod) => void;
  updatePaymentMethod: (paymentMethod: paymentMethod, nickName: string) => void;
  updateOrder: (order: order) => void;
  initializeMyCart: (newCardItem: any) => void;
  updateLoading: (isLoading: boolean) => void;
}

export const ControllersContext = createContext({} as ControllersContextData)

type ControllersContextProviderProps = {
  children: ReactNode,
}

type newCardItem = {
  id: number;
  name: string,
  pathImage: string,
  description: string,
  type: string,
  price: number,
  priceBySize: number,
  quantity: number,
  size: string,
  observation: string,
}

type selectedItemMenu = {
  gradient: string,
  isActive: boolean,
  name: string,
  path: string
}

type paymentMethod = {
  nickName: string,
  number: string,
  type: string,
  niceType: string,
  valid: string,
  CVC: string,
  nameOwner: string
}

type order = {
  cartItems: Array<newCardItem>,
  dateOrder: string,
  orderStatus: Array<stepOrderStatus>,
  orderId: number,
}

type stepOrderStatus = {
  step: string,
  completeDate: string
}

export function ControllersContextProvider({ children }: ControllersContextProviderProps) {
  const [selectedItemMenu, setSelectedItem] = useState({
    gradient: '',
    isActive: false,
    name: '',
    path: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setMyCart] = useState([])
  const [headerText, setHeaderText] = useState('')
  const [footerType, setFooterType] = useState('main')
  const [mainPaymentMethod, setMainPaymentMethod] = useState({
    nickName: 'Money',
    number: "",
    type: 'Money',
    niceType: 'Money',
    valid: '',
    CVC: '',
    nameOwner: ''
  })
  const [paymentMethods, setPaymentMethods] = useState([])
  const [addingCardItem, setAddingCardItem] = useState({
    id: 0,
    name: '',
    pathImage: '',
    description: '',
    type: '',
    price: 0,
    priceBySize: 0,
    quantity: 0,
    size: '',
    observation: ''
  })
  const [order, setOrder] = useState([])


  const updateLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  const updateSelectedItemMenu = (selectedItem: selectedItemMenu) => {
    setSelectedItem(selectedItem)
  }


  const initializePaymentMethods = (paymentMethods: Array<paymentMethod>) => {
    setPaymentMethods(paymentMethods)
  }

  const updatePaymentMethods = (paymentMethod: paymentMethod) => {
    setPaymentMethods([...paymentMethods, paymentMethod])
  }

  const updateMainPaymentMethod = (paymentMethod: paymentMethod) => {
    setMainPaymentMethod(paymentMethod)
  }

  const updateAddingCartItem = (newCardItem: newCardItem) => {
    setAddingCardItem(newCardItem)
  }

  const updateHeaderText = (text: string) => {
    setHeaderText(text)
  }

  const updateFooterType = (footerType: string) => {
    setFooterType(footerType)
  }


  const updateOrder = (newOrder: order) => {
    setOrder([...order, {
      ...newOrder, orderStatus: [
        {
          step: 'confirmation',
          completeDate: '',
        },
        {
          step: 'preparation',
          completeDate: '',
        },
        {
          step: 'delivery',
          completeDate: '',
        },
        {
          step: 'arrived',
          completeDate: '',
        }
      ],
    }])
  }


  const removingItemFromCart = (selectedItem: newCardItem) => {
    const newItems = cartItems.filter(item => item.id !== selectedItem.id)

    setMyCart([...newItems])
  }

  const removingPaymentMethod = (paymentMethod: paymentMethod) => {
    const newPaymentMethods = paymentMethods.filter(item => item.number !== paymentMethod.number)

    setPaymentMethods([...newPaymentMethods])
  }

  const updatePaymentMethod = (paymentMethod: paymentMethod, nickName: string) => {

    const newPaymentMethods = paymentMethods.map(item => {
      if (item.number === paymentMethod.number) {
        item = { ...item, nickName: nickName }
        return item
      }
      return item
    })


    setPaymentMethods([...newPaymentMethods])
  }

  
  const initializeMyCart = (newCardItem: any) => {
    const newCardItems = _.uniqBy([...cartItems, ...newCardItem], 'id')

    setMyCart([...newCardItems])
  }

  const updateMyCart = (newCardItem: newCardItem) => {
    var arr = []

    if (cartItems.length > 0) {
      arr = cartItems.map(item => {
        if (item.id === newCardItem.id) {
          item = newCardItem
        }
        return item
      })

      const newItem = _.uniq([...arr, newCardItem])

      setMyCart([...newItem])

    } else {
      const newItem = _.uniq([...cartItems, newCardItem])

      setMyCart([...newItem])
    }
  }

  return (
    <ControllersContext.Provider
      value={{
        selectedItemMenu,
        addingCardItem,
        cartItems,
        headerText,
        footerType,
        paymentMethods,
        mainPaymentMethod,
        isLoading,
        order,
        initializeMyCart,
        updateSelectedItemMenu,
        updateAddingCartItem,
        updateMyCart,
        updateHeaderText,
        updateFooterType,
        removingItemFromCart,
        updatePaymentMethods,
        updatePaymentMethod,
        updateMainPaymentMethod,
        removingPaymentMethod,
        initializePaymentMethods,
        updateOrder,
        updateLoading
      }}
    >
      {children}
    </ControllersContext.Provider>
  )
}