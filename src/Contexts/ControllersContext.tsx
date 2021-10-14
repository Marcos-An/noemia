import { createContext, useState, ReactNode } from 'react';


type ControllersContextData = {
  selectedItemMenu: selectedItemMenu;
  addingCardItem: newCardItem;
  myCartItems: Array<newCardItem>;
  headerText: string;
  footerType: string;
  updateSelectedItemMenu: (selectedItem: object) => void;
  updateAddingCardItem: (newCardItem: newCardItem) => void;
  updateMyCart: (newCardItem: newCardItem) => void;
  updateHeaderText: (text: string) => void;
  updateFooterType: (type: string) => void;
  removingItemFromCart: (selectedItem: newCardItem) => void;
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

export function ControllersContextProvider({ children }: ControllersContextProviderProps) {
  const [selectedItemMenu, setSelectedItem] = useState({
    gradient: '',
    isActive: false,
    name: '',
    path: ''
  })
  const [myCartItems, setMyCart] = useState([])
  const [headerText, setHeaderText] = useState('')
  const [footerType, setFooterType] = useState('main')
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

  const updateSelectedItemMenu = (selectedItem: selectedItemMenu) => {
    setSelectedItem(selectedItem)
  }

  const updateAddingCardItem = (newCardItem: newCardItem) => {
    setAddingCardItem(newCardItem)
  }

  const updateHeaderText = (text: string) => {
    setHeaderText(text)
  }

  const updateFooterType = (footerType: string) => {
    setFooterType(footerType)
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
        updateSelectedItemMenu,
        updateAddingCardItem,
        updateMyCart,
        updateHeaderText,
        updateFooterType,
        removingItemFromCart
      }}
    >
      {children}
    </ControllersContext.Provider>
  )
}