export const editFunctionClick = (id: number, newBoard: any, setNewBoard: any, setEditBoard: Function) => {
  const val = (document.getElementById("boardEditForm") as HTMLInputElement).value
  const boardId = id

  if (boardId !== null) {
    let newBoardData = [...newBoard]
    newBoardData[boardId].name = val
    setNewBoard(newBoardData)
    setEditBoard(false)
  }
}