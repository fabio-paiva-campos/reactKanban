import React, { KeyboardEvent, useState } from 'react'
import Layout from '../components/Layout'
import CardItem from '../components/CardItem'

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useAppContext, createId } from '../hooks/Context';

function Boards() {
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [newBoard, setNewBoard] = useAppContext()
  const [editBoard, setEditBoard] = useState(false)
  const [justCreated, setJustCreated] = useState(false)
  const [ready, setReady] = useAppContext()
  const [editCard, setEditCard] = useState(false)

  const onDragEnd = (re: any) => {
    if (!re.destination) return
    let newBoardData = newBoard
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )
    setNewBoard(newBoardData)
  }

  const editFunction = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    funcValue: Function,
    itemArray?: any
    ) => {

    if (e.key == 'Enter') {
      const val = e.currentTarget.value
      if (val.length === 0) {
        funcValue(false)
      } else {
        let dataId = (e.target as Element).attributes.getNamedItem('data-id')
        const boardId = dataId && Number(dataId.value)

        if (boardId !== null) {
          const item = itemArray
          let newBoardData = [...newBoard]
          if (item) {
            item.title = val
            newBoardData[boardId].items.push(item)
          } else {
            newBoardData[boardId].name = val
          }
          setNewBoard(newBoardData)
          funcValue(false)
          e.currentTarget.value = ''
        }
      }
    }
  }

  const editBoardAction = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setJustCreated(false)
    editFunction(e, setEditBoard)
  }

  const editFunctionClick = (
    id: number,
    funcValue: Function,
    itemArray?: any,
    ) => {
    let val: string
    val = (document.getElementById("boardEditForm") as HTMLInputElement).value

    if (val.length === 0) {
      funcValue(false)        
    } else {
      const boardId = id

      if (boardId !== null) {
        const item = itemArray
        let newBoardData = [...newBoard]
        if (item) {
          item.title = val
          newBoardData[boardId].items.push(item)
        } else {
          newBoardData[boardId].name = val
        }
        setNewBoard(newBoardData)
        funcValue(false)
      }
    }
  }

  const editBoardActionClick = (id: number) => {
    setJustCreated(false)
    editFunctionClick(id, setEditBoard)
  }

  function CreateBoardAction() {
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

  function deleteBoard(value: number) {
    let id = value
    console.log(id)

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

  function conditionalDelete(value:number) {
    let id = value

    if (justCreated == true) {
      deleteBoard(id)
      setJustCreated(false)
    } else {
      setEditBoard(false)
    }
  }

  const createCard = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const item = {
      id: createId(),
      priority: 0,
      cnpj: 0,
      porte: 0,
      obs: [],
      info: [],
    }
    editFunction(e, setEditCard, item)
  }

  return (
    <Layout>
      <div className="GeneralAreaKanbanContent">
        <div className="GeneralKanbanHeader">
          <div className="HeaderTextArea">
            <h4 className="">Kanbão</h4>
          </div>
          <ul className="CreateNewColumnList">
            <li>
              <button onClick={() => CreateBoardAction()} className="">
                <AddIcon className="IconeMaisCreateNewBoard" />
              </button>
            </li>
          </ul>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="BoardCollumGeneral">
              {newBoard?.map((board: any, id: any) => {
                return (
                  <div key={board.id}>
                    <Droppable droppableId={id.toString()}>
                      {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          <div className={`CollumGeneralArea
                            ${snapshot.isDraggingOver && 'GreenColor'}`}>
                            <span className="RedLineCollum">
                            </span>
                            <h4 className="TitleBoardArea">
                              <span className="BoardTitle">
                                {editBoard && selectedBoard === id ? (
                                  <div>
                                    <textarea id="boardEditForm" className="textEdit" autoFocus defaultValue={board.name}
                                    data-id={id} rows={1} onKeyDown={(e) => editBoardAction(e)}></textarea>
                                    <button className="DotsVerticalIcon" onClick={() => editBoardActionClick(id)}><CheckIcon /></button>
                                    <button className="DotsVerticalIcon" onClick={() => conditionalDelete(board.id)}><CloseIcon /></button>
                                  </div>
                                ) : (
                                  <span>{board.name}</span>
                                )}
                              </span>
                              <Menu menuButton={<MenuButton><MoreVertIcon className="DotsVerticalIcon" /></MenuButton>} transition>
                                <MenuItem onClick={() => { setSelectedBoard(id), setEditBoard(true) }}>Editar</MenuItem>
                                <MenuItem onClick={() => { deleteBoard(board.id) }}>Excluir</MenuItem>
                              </Menu>
                            </h4>
                            <div className="CardAreaInCollum"
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {board.items?.length > 0 &&
                                board.items.map((item: any, iIndex: any) => {
                                  return (
                                    <CardItem key={item.id} data={item} index={iIndex} className="CardItemClass" />
                                  )
                                })}
                              {provided.placeholder}
                            </div>

                            {editCard && selectedBoard === id ? (
                              <div className="AroundTextAreaAddTask">
                                <textarea id="taskTitle" className="addTaskForm" autoFocus rows={3} placeholder="Descrição do Card"
                                data-id={id} onKeyDown={(e) => createCard(e)} />
                                <button onClick={() => {setEditCard(false)}}>x</button>
                              </div>
                            ) : (
                              <button
                                className="ButtonAddTask"
                                onClick={() => { setSelectedBoard(id), setEditCard(true) }}>
                                <span>Adicionar Card</span>
                                <AddIcon className="PlusCircleIcon" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  )
}

export default Boards