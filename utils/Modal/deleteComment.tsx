export function deleteComment(value: number, newBoard: any, setNewBoard: any) {
    let id = value
  
    let commentFinal = [...newBoard]
    if (confirm("Excluir Comentário?")) {
      commentFinal.forEach((board) => board.items.forEach((items: any) =>
      items.obs.forEach((obs: any, index: any) => {
          if (obs.id === id) {
            items.obs.splice(index, 1)
          }
        }
      )))
      setNewBoard(commentFinal)
    }
  }