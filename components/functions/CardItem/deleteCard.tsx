export function deleteCard(value: number, newBoard: any, setNewBoard: any) {
    let id = value
  
    let cardsFinal = [...newBoard]
    if (confirm("Excluir Card?")) {
      cardsFinal.forEach((board) => board.items.forEach((items: any, index: any) => {
        if (items.id === id) {
          board.items.splice(index, 1)
        }
      }));
      setNewBoard(cardsFinal)
    }
  }