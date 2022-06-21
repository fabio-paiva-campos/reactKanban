import { deleteBoard } from "./deleteBoard"

export function conditionalDelete(value:number, newBoard: any, setNewBoard: any, justCreated: any, setJustCreated: any, setEditBoard: any) {
    let id = value

    if (justCreated == true) {
      deleteBoard(id, newBoard, setNewBoard)
      setJustCreated(false)
    } else {
      setEditBoard(false)
    }
}