import React from 'react';
import { createContext, useContext, useState } from 'react';
import BoardData from '../data/board-data.json'

const Context = React.createContext<[any, any]>(undefined!);

export function ContextWrap({ children }: any) {
    const [newBoard, setNewBoard] = useState(BoardData)

    return (
        <Context.Provider value={[newBoard, setNewBoard]}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
  return useContext(Context);
}