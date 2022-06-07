export function deleteBoard(value: number, newBoard: any, setNewBoard: any) {
    let id = value

    let boardsFinal = [...newBoard]
    if (confirm('Excluir Board?')) {
      boardsFinal.forEach((board, index) => {
        if (board.id === id) {
          boardsFinal.splice(index, 1)
        }
      });
      setNewBoard(boardsFinal)
    }
  }