export function editCommentAction(value: number, newBoard: any, setNewBoard: any, setEditComment: Function) {
    let id = value
    let edit: string
    edit = (document.getElementById("editCommentText") as HTMLInputElement).value

    var today = new Date()
    let dateTime: string = 'Editado em ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() +
                            ' às ' + today.getHours() + ':' + today.getMinutes()

    let commentFinal = [...newBoard]
    commentFinal.forEach((board) => board.items.forEach((items: any) =>
    items.obs.forEach((obs: any) => {
        if (obs.id === id) {
          obs.content = edit
          obs.edit = dateTime
        }
      }
    )))
    setNewBoard(commentFinal)
    setEditComment(false)
  }