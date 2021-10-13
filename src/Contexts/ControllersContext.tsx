import { createContext, useState, ReactNode } from 'react';


type ControllersContextData = {
  selectedItemMenu: object;
  addingCardItem: newCardItem;
  myCartItems: Array<newCardItem>;
  headerText: string;
  updateSelectedItemMenu: (selectedItem: object) => void;
  updateAddingCardItem: (newCardItem: newCardItem) => void;
  updateMyCart: (newCardItem: newCardItem) => void;
  updateHeaderText: (text: string) => void;
}



export const ControllersContext = createContext({} as ControllersContextData)

type ControllersContextProviderProps = {
  children: ReactNode,
}

type newCardItem = {
  name: string,
  pathImage: string,
  description: string,
  type: string,
  price: number,
  quantity: number,
  size: string,
  observation: string,
}

export function ControllersContextProvider({ children }: ControllersContextProviderProps) {
  const [selectedItemMenu, setSelectedItem] = useState({})
  const [myCartItems, setMyCart] = useState([])
  const [headerText, setHeaderText] = useState('')
  const [addingCardItem, setAddingCardItem] = useState({
    name: '',
    pathImage: '',
    description: '',
    type: '',
    price: 0,
    quantity: 0,
    size: '',
    observation: ''
  })

  const updateSelectedItemMenu = (selectedItem) => {
    setSelectedItem(selectedItem)
  }

  const updateAddingCardItem = (newCardItem: newCardItem) => {
    setAddingCardItem(newCardItem)
  }

  const updateHeaderText = (text) => {
    setHeaderText(text)
  }

  const updateMyCart = (newCardItem: newCardItem) => {
    const arr = [...myCartItems, newCardItem]
    const newItems = arr.filter((current, i) => {
      return arr.indexOf(current) === i;
    });

    setMyCart(newItems)
  }

  return (
    <ControllersContext.Provider
      value={{
        selectedItemMenu,
        addingCardItem,
        myCartItems,
        headerText,
        updateSelectedItemMenu,
        updateAddingCardItem,
        updateMyCart,
        updateHeaderText
      }}
    >
      {children}
    </ControllersContext.Provider>
  )
}