import { IBoardData } from "../../../hooks/Context"

export const editFunctionClick = (id: number, newBoard: IBoardData[], setNewBoard: any, setEditBoard: Function) => {
  const val = (document.getElementById("boardEditForm") as HTMLInputElement).value
  const boardId = id

  if (boardId !== null) {
    let newBoardData = newBoard;
    newBoardData.find(p => p.id === id && (p.name = val.trim()))
    
    setNewBoard(newBoardData)
    setEditBoard(false)
  }
}