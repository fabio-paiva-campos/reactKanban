import { KeyboardEvent } from 'react'
import { createId, useAppContext } from '../../../hooks/Context'
import { editFunction } from './editFunction'

export const createCard = (index: number, e: KeyboardEvent<HTMLTextAreaElement>, setEditBoard: any, newBoard: any, setNewBoard: any) => {
    const card = {
      id: createId(),
      priority: 0,
      title : (document.getElementById("taskTitle") as HTMLInputElement).value,
      cnpj: 0,
      porte: 0,
      obs: [],
      info: [],
    }
    if(e.key == 'Enter') {
      let newCard = [...newBoard]
      newCard.forEach((board) => {
        if (board.id === index) {
          board.items.push(card)
        }
      })
      setNewBoard(newCard)
      setEditBoard(false)
    }
}