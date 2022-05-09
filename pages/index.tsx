import React, { KeyboardEvent, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CardItem from '../components/CardItem'
import BoardData from '../data/board-data.json'
import { ChevronDownIcon, PlusIcon, DotsVerticalIcon, PlusCircleIcon, TrashIcon, CheckIcon, XIcon, ChatAlt2Icon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css';

export interface IBoardItem {
  id?: number;
  priority?: number;
  title?: string;
  cnpj?: string;
  porte?: number;
  obs?: any[];
  info?: any[];
}

export interface IBoardData {
  id: number;
  name: string;
  items: IBoardItem[];
}

export function createId() {
  return Math.random()
}

function Home() {
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [newBoard, setNewBoard] = useState(BoardData)
  const [editBoard, setEditBoard] = useState(false)
  const [justCreated, setJustCreated] = useState(false)

  const [ready, setReady] = useState(false)
  const [editCard, setEditCard] = useState(false)

  const [selectedComment, setSelectedComment] = useState(0)
  const [editComment, setEditComment] = useState(true)

  useEffect(() => {
    if (typeof window) {
      setReady(true)
    }
  }, [])

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
    const form = document.getElementById("boardEditForm")

    if (e.key == 'Enter') {
      const val = e.currentTarget.value
      if (val.length === 0) {
        funcValue(false)
      } else {
        let dataId = (e.target as Element).attributes.getNamedItem('data-id')
        const boardId = dataId && Number(dataId.value)

        if (boardId !== null) {
          const item = itemArray
          let newBoardData = newBoard
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
    val = document.getElementById("boardEditForm")?.value

    if (val.length === 0) {
      funcValue(false)        
    } else {
      const boardId = id

      if (boardId !== null) {
        const item = itemArray
        let newBoardData = newBoard
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
    let index = value
    if (confirm('Excluir Board?')) {
      const finalBoard: IBoardData[] = [];
      newBoard.map((item, key) => {
        if(key !== index){
          finalBoard.push(item);
        }
        return setNewBoard(finalBoard)
      })
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

  function deleteCard(value: number) {
    let id = value
  
    let cardsFinal = [...newBoard]
    if (confirm("Excluir Card?")) {
      cardsFinal.forEach((board) => board.items.forEach((items, index) => {
        if (items.id === id) {
          board.items.splice(index, 1)
        }
      }));
      setNewBoard(cardsFinal)
    }
  }

  function setPriority(value: number, priority: number) {
    let prior = priority
    let id = value

    let priorityFinal = [...newBoard]
    priorityFinal.forEach((board) => board.items.forEach((items) => {
      if (items.id === id) {
        items.priority = prior
      }
    }))
    setNewBoard(priorityFinal)
  }

  const addComment = (id:number, e: KeyboardEvent<HTMLTextAreaElement> ) => {
    if (e.key == 'Enter') {
      const val = e.currentTarget.value
      let dataId:any = id

      const comment = {
        id: createId(),
        content: val
      }

      let newComment = [...newBoard]
      newComment.forEach((board) => board.items.forEach((items) => {
        if (items.id === dataId) {
          items.obs.push(comment)
        }
      }))
      setNewBoard(newComment)
      e.currentTarget.value = ''
    }
  }

  function editCommentAction(value: number, e: KeyboardEvent<HTMLTextAreaElement>) {
    let id = value

    let commentFinal = [...newBoard]
    if (e.key == 'Enter') {
      const edit = e.currentTarget.value
      commentFinal.forEach((board) => board.items.forEach((items) =>
      items.obs.forEach((obs) => {
          if (obs.id === id) {
            obs.content = edit
          }
        }
      )))
      setNewBoard(commentFinal)
      setEditComment(true)
    }
  }

  function deleteComment(value: number) {
    let id = value
  
    let commentFinal = [...newBoard]
    if (confirm("Excluir Comentário?")) {
      commentFinal.forEach((board) => board.items.forEach((items) =>
      items.obs.forEach((obs, index) => {
          if (obs.id === id) {
            items.obs.splice(index, 1)
          }
        }
      )))
      setNewBoard(commentFinal)
    }
  }

  return (
    <Layout>
      <div className="GeneralAreaKanbanContent">
        <div className="GeneralKanbanHeader">
          <div className="HeaderTextArea">
            <h4 className="">Kanbão</h4>
            <ChevronDownIcon className="SetaBaixoIconHeaderTitle"/>
          </div>
          <ul className="CreateNewColumnList">
            <li>
              <button onClick={() => CreateBoardAction()} className="">
                <PlusIcon className="IconeMaisCreateNewBoard" />
              </button>
            </li>
          </ul>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="BoardCollumGeneral">
              {newBoard.map((board, id) => {
                return (
                  <div key={board.name}>
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
                                    <textarea id="boardEditForm" className="textEdit" autoFocus
                                    data-id={id} rows={1} onKeyDown={(e) => editBoardAction(e)}>
                                      {board.name}
                                    </textarea>
                                    <button className="DotsVerticalIcon" onClick={() => editBoardActionClick(id)}><CheckIcon /></button>
                                    <button className="DotsVerticalIcon" onClick={() => conditionalDelete(id)}><XIcon /></button>
                                  </div>
                                ) : (
                                  <span>{board.name}</span>
                                )}
                              </span>
                              <Menu menuButton={<MenuButton><DotsVerticalIcon className="DotsVerticalIcon" /></MenuButton>} transition>
                                  <MenuItem onClick={() => { setSelectedBoard(id), setEditBoard(true) }}>Editar</MenuItem>
                                  <MenuItem onClick={() => { deleteBoard(id) }}>Excluir</MenuItem>
                              </Menu>
                            </h4>
                            <div className="CardAreaInCollum"
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem key={item.id} data={item} index={iIndex} className="CardItemClass"

                                    priority = {<Menu menuButton={<MenuButton><ChevronDownIcon className="cardMenuIcon"/></MenuButton>}
                                                direction={'left'} transition>
                                                <MenuItem onClick={() => {setPriority(item.id, 0)}}>Baixa Prioridade</MenuItem>
                                                <MenuItem onClick={() => {setPriority(item.id, 1)}}>Média Prioridade</MenuItem>
                                                <MenuItem onClick={() => {setPriority(item.id, 2)}}>Alta Prioridade</MenuItem>
                                                </Menu>}

                                    comments = 
                                    {<>
                                      {item.obs.map((o, id) => (
                                        <ul key={o.id}>
                                          {editComment ? (
                                            <li className='commentsListItem'>{o.content}
                                              <p>
                                                <a onClick={() => (setEditComment(false), (e: any) => editCommentAction(id, e))}>✍️</a>
                                                <a onClick={() => (deleteComment(o.id))}>🗑️</a>
                                              </p>
                                            </li>
                                          ) : (
                                            <a className="editCommentForm">
                                              <textarea className="editCommentText" autoFocus rows={1} onKeyDown={(e) => editCommentAction(o.id, e)}>
                                                {o.content}
                                              </textarea>
                                              <button onClick={() => {setSelectedComment(o.id), setEditComment(true)}}>x</button>
                                            </a>
                                          )}
                                        </ul>
                                      ))}
                                      <p>
                                        <textarea className="addCommentForm" rows={1} placeholder={'Adicionar Comentário'}
                                                  onKeyDown={(e) => addComment(item.id, e)} />
                                      </p>
                                    </>}

                                    excluir = {<button onClick={() => {deleteCard(item.id)}}><TrashIcon className='deleteIcon'/></button>}/>
                                  )
                                })}
                              {provided.placeholder}
                            </div>

                            {editCard && selectedBoard === id ? (
                              <div className="AroundTextAreaAddTask">
                                <textarea id="taskTitle" className="addTaskForm" autoFocus rows={3} placeholder=" Descrição do Card"
                                data-id={id} onKeyDown={(e) => createCard(e)} />
                                <button onClick={() => {setEditCard(false)}}>x</button>
                              </div>
                            ) : (
                              <button
                                className="ButtonAddTask"
                                onClick={() => { setSelectedBoard(id), setEditCard(true) }}>
                                <span>Adicionar Card</span>
                                <PlusCircleIcon className="PlusCircleIcon" />
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

export default Home
