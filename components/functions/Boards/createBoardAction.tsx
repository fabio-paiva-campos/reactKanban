import { createId } from "../../../hooks/Context"

export function createBoardAction(newBoard: any, setNewBoard: any, setSelectedBoard: any, setJustCreated: Function, setEditBoard: Function) {
    let count = newBoard.length + 1
    const board = {
      id: createId(),
      name: 'Novo Board ' + count,
      items: [],
    }
    setNewBoard([...newBoard, board])
    setSelectedBoard(count-1)
    setJustCreated(true)
    setEditBoard(true)
}