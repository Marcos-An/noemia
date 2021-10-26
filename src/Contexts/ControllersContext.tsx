import { createContext, useState, ReactNode } from 'react';


type ControllersContextData = {
  selectedItemMenu: selectedItemMenu;
  addingCardItem: newCardItem;
  myCartItems: Array<newCardItem>;
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
  const [isLoading, setIsLoading] = useState(true)
  const [myCartItems, setMyCart] = useState([])
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
    const newItems = myCartItems.filter(item => item.id !== selectedItem.id)

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

    console.log(paymentMethods)
    setPaymentMethods([...newPaymentMethods])
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
        paymentMethods,
        mainPaymentMethod,
        isLoading,
        order,
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