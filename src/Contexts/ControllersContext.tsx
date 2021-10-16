import { createContext, useState, ReactNode } from 'react';


type ControllersContextData = {
  selectedItemMenu: selectedItemMenu;
  addingCardItem: newCardItem;
  myCartItems: Array<newCardItem>;
  headerText: string;
  footerType: string;
  address: address;
  myInformations: myInformations;
  paymentMethods: Array<paymentMethod>;
  mainPaymentMethod: paymentMethod;
  order: Array<order>;
  updateSelectedItemMenu: (selectedItem: object) => void;
  updateAddingCartItem: (newCardItem: newCardItem) => void;
  updateMyCart: (newCardItem: newCardItem) => void;
  updateHeaderText: (text: string) => void;
  updateFooterType: (type: string) => void;
  removingItemFromCart: (selectedItem: newCardItem) => void;
  updateAddress: (address: address) => void;
  updateMyInformations: (myInformations: myInformations) => void;
  updatePaymentMethods: (paymentMethod: paymentMethod) => void;
  updateMainPaymentMethod: (paymentMethod: paymentMethod) => void;
  updateOrder: (order: order) => void;
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

type address = {
  street: string,
  number: string,
  zipCode: string,
  state: string,
  city: string,
  neighbourhood: string
}

type myInformations = {
  name: string,
  email: string,
  phone: string,
}

type paymentMethod = {
  nickName: string,
  cardNumber: string,
  type: string,
  niceType: string,
  valid: string,
  CVC: string,
  nameOwner: string
}

type order = {
  myCartItems: Array<newCardItem>,
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
  const [address, setAddress] = useState({
    street: '',
    number: '',
    zipCode: '',
    state: '',
    city: '',
    neighbourhood: ''
  })
  const [myCartItems, setMyCart] = useState([])
  const [headerText, setHeaderText] = useState('')
  const [footerType, setFooterType] = useState('main')
  const [mainPaymentMethod, setMainPaymentMethod] = useState({
    nickName: 'Money',
    cardNumber: "",
    type: 'Money',
    niceType: 'Money',
    valid: '',
    CVC: '',
    nameOwner: ''
  })
  const [paymentMethods, setPaymentMethods] = useState([
    {
      nickName: 'Money',
      cardNumber: "",
      type: 'Money',
      niceType: 'Money',
      valid: '',
      CVC: '',
      nameOwner: ''
    }
  ])
  const [myInformations, setMyInformations] = useState({
    name: "Marcos Antonio da Silva Junior",
    email: "marcos.silva@gmail.com",
    phone: "67999290375",
  })
  const [addingCardItem, setAddingCardItem] = useState({
    id: 0,
    name: '',
    pathImage: '',
    description: '',
    type: '',
    price: 0,
    quantity: 0,
    size: '',
    observation: ''
  })
  const [order, setOrder] = useState([])

  const updateSelectedItemMenu = (selectedItem: selectedItemMenu) => {
    setSelectedItem(selectedItem)
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

  const updateAddress = (address: address) => {
    setAddress(address)
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

  const updateMyInformations = (myInformations: myInformations) => {
    setMyInformations(myInformations)
  }

  const removingItemFromCart = (selectedItem: newCardItem) => {
    const newItems = myCartItems.filter(item => item.id !== selectedItem.id)

    setMyCart([...newItems])
  }

  const updateMyCart = (newCardItem: newCardItem) => {
    var arr = []

    if (myCartItems.length > 0) {
      arr = myCartItems.map(item => {
        if (item.name === newCardItem.name) {
          item = newCardItem
        }
        return item
      })

      const index = arr.findIndex(item => item.name !== newCardItem.name)


      if (index !== -1) {
        setMyCart([...arr, newCardItem])
      } else {
        setMyCart([...arr])
      }

    } else {
      setMyCart([...myCartItems, newCardItem])
    }
  }

  return (
    <ControllersContext.Provider
      value={{
        selectedItemMenu,
        addingCardItem,
        myCartItems,
        headerText,
        footerType,
        address,
        myInformations,
        paymentMethods,
        mainPaymentMethod,
        order,
        updateSelectedItemMenu,
        updateAddingCartItem,
        updateMyCart,
        updateHeaderText,
        updateFooterType,
        removingItemFromCart,
        updateAddress,
        updateMyInformations,
        updatePaymentMethods,
        updateMainPaymentMethod,
        updateOrder
      }}
    >
      {children}
    </ControllersContext.Provider>
  )
}