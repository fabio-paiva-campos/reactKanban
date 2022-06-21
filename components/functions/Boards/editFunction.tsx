import { KeyboardEvent } from 'react'
import { IBoardData } from '../../../hooks/Context'

export const editFunction = (id: number, e: KeyboardEvent<HTMLTextAreaElement>, newBoard: IBoardData[], setNewBoard: any, setEditBoard: Function) => {

  if (e.key == 'Enter') {
    const val = (document.getElementById("boardEditForm") as HTMLInputElement).value
    const boardId = id

    if (boardId !== null) {
      let newBoardData = newBoard
      newBoardData.find(board => board.id === id && (board.name = val.trim()))
      setNewBoard(newBoardData)
      setEditBoard(false)
    }
  }
}