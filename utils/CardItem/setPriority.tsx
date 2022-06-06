export function setPriority(value: number, priority: number, newBoard: any, setNewBoard: any) {
    let prior = priority
    let id = value

    let priorityFinal = [...newBoard]
    priorityFinal.forEach((board) => board.items.forEach((items: any) => {
      if (items.id === id) {
        items.priority = prior
      }
    }))
    setNewBoard(priorityFinal)
  }