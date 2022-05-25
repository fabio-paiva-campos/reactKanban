import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

export interface IBoardItem {
    id?: number;
    priority?: number;
    title?: string;
    cnpj?: string;
    porte?: number;
    obs?: any[];
    info?: any[];
}
  
  export interface IBoardData {
    id: number;
    name: string;
    items: IBoardItem[];
}

export function createId() {
    return Math.random()
}

let initialList = [{id: 0, name: "A Fazer", items: []},
                   {id: 1, name: "Em Andamento", items: []},
                   {id: 2, name: "Concluído", items: []}]

const Context = createContext<[any, any, any, any]>(undefined!);

export function ContextWrap({ children }: any) {
    const [newBoard, setNewBoard] = useState(initialList)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
      }, [])

    return (
        <Context.Provider value={[newBoard, setNewBoard, ready, setReady]}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
  return useContext(Context);
}