import { createId } from "../../../hooks/Context"

export const addComment = (id: any, newBoard: any, setNewBoard: any) => {
    let val: string
    val = (document.getElementById("addCommentText") as HTMLInputElement).value
    let dataId:number = Number(id)

    var today = new Date()
    let dateTime: string = 'Adc. em ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() +
                            ' às ' + today.getHours() + ':' + today.getMinutes()

    if(val !== '') {
      const comment = {
        id: createId(),
        content: val,
        add: dateTime,
        edit: ''
      }
      let newComment = [...newBoard]
      newComment.forEach((board) => board.items.forEach((items: any) => {
        if (items.id === dataId) {
          items.obs.push(comment)
        }
      }))
      setNewBoard(newComment),
      (document.getElementById("addCommentText") as HTMLInputElement).value = ''
    }
  }