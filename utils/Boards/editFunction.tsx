import { KeyboardEvent } from 'react'

export const editFunction = (id: number, e: KeyboardEvent<HTMLTextAreaElement>, newBoard: any, setNewBoard: any, setEditBoard: Function) => {

  if (e.key == 'Enter') {
    const val = (document.getElementById("boardEditForm") as HTMLInputElement).value
    const boardId = id

    if (boardId !== null) {
      let newBoardData = [...newBoard]
      newBoardData[boardId].name = val
      setNewBoard(newBoardData)
      setEditBoard(false)
    }
  }
}