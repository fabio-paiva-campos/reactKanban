import { IBoardData, IBoardItem } from "../../../hooks/Context";

export async function deleteBoard(value: number, newBoard: IBoardData[], setNewBoard: any) {
    let id = value

    let boardsFinal = JSON.parse(JSON.stringify(newBoard))

    if (confirm('Excluir Board?')) {
      boardsFinal.find((p: IBoardItem, key: number) => p.id === id && (boardsFinal.splice(key, 1)));

      setNewBoard(boardsFinal)
    }
  }