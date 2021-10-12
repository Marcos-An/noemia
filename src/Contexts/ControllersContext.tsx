import { createContext, useState, ReactNode } from 'react';


type ControllersContextData = {
  selectedItemMenu: object;
  addingCardItem: newCardItem;
  updateSelectedItemMenu: (selectedItem: object) => void;
  updateAddingCardItem: (itemToAdd: newCardItem) => void;
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

  return (
    <ControllersContext.Provider
      value={{
        selectedItemMenu,
        addingCardItem,
        updateSelectedItemMenu,
        updateAddingCardItem
      }}
    >
      {children}
    </ControllersContext.Provider>
  )
}