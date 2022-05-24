import React from 'react';
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

let initialList = [{id: 0, name: "A Fazer", items: []},
                   {id: 0, name: "Em Andamento", items: []},
                   {id: 0, name: "Concluído", items: []}]

const Context = createContext<[any, any]>(undefined!);

export function ContextWrap({ children }: any) {
    const [newBoard, setNewBoard] = useState(initialList)

    return (
        <Context.Provider value={[newBoard, setNewBoard]}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
  return useContext(Context);
}