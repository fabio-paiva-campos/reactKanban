import { IBoardData, IBoardItem } from "../../../hooks/Context"

export function deleteComment(value: number, newBoard: IBoardData, setNewBoard: any) {
    let id = value
  
    let commentFinal = JSON.parse(JSON.stringify(newBoard))
    if (confirm("Excluir Comentário?")) {
      commentFinal.forEach((board: IBoardData) => board.items.forEach((items: IBoardItem) =>
      items.obs?.forEach((obs: any, index: any) => {
          if (obs.id === id) {
            items.obs?.splice(index, 1)
          }
        }
      )))
      setNewBoard(commentFinal)
    }
  }