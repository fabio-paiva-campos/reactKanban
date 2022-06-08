import React, { useEffect, useState } from 'react'
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
import { IBoardData, useAppContext } from '../hooks/Context';

import { editFunction } from './utils/Boards/editFunction';
import { editFunctionClick } from './utils/Boards/editFunctionClick';
import { createBoardAction } from './utils/Boards/createBoardAction';
import { conditionalDelete } from './utils/Boards/conditionalDelete';
import { deleteBoard } from './utils/Boards/deleteBoard';
import { createCard } from './utils/Boards/createCard';

function Boards() {
  const [newBoard, setNewBoard] = useAppContext()
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [editBoard, setEditBoard] = useState(false)
  const [editCard, setEditCard] = useState(false)
  const [justCreated, setJustCreated] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const onDragEnd = (re: any) => {
    if (!re.destination) return
    let newBoardData = newBoard;

    if(re.source.droppableId){
      console.log(re.source.droppableId);
    }

    var dragItem = newBoardData[parseInt(re.source.droppableId)].items[re.source.index];

    newBoardData[parseInt(re.source.droppableId)].items.splice(re.source.index,1)

    newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index, 0, dragItem)
    setNewBoard(newBoardData)
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
              <button onClick={() => createBoardAction(newBoard, setNewBoard, setSelectedBoard, setJustCreated, setEditBoard)} className="">
                <AddIcon className="IconeMaisCreateNewBoard"/>
              </button>
            </li>
          </ul>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="BoardCollumGeneral">
              {newBoard?.map((board: IBoardData, key: number) => {
                let id = board.id;
                console.log(id)
                return (
                  <div key={id}>
                    <Droppable droppableId={key.toString()}>
                      {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          <div className={`CollumGeneralArea ${snapshot.isDraggingOver && 'GreenColor'}`}>
                            <span className="RedLineCollum">
                            </span>
                            <h4 className="TitleBoardArea">
                              <span className="BoardTitle">
                                {editBoard && selectedBoard === id ? (
                                  <div>
                                    <textarea id="boardEditForm" className="textEdit" autoFocus defaultValue={board.name}
                                    data-id={id} rows={1} onKeyDown={(e) => {setJustCreated(false), editFunction(id, e, newBoard, setNewBoard, setEditBoard)}}></textarea>
                                    <button className="DotsVerticalIcon" onClick={() => {setJustCreated(false), editFunctionClick(id, newBoard, setNewBoard, setEditBoard)}}><CheckIcon/></button>
                                    <button className="DotsVerticalIcon" onClick={() => conditionalDelete(id, newBoard, setNewBoard, justCreated, setJustCreated, setEditBoard)}><CloseIcon/></button>
                                  </div>
                                ) : (
                                  <span>{board.name}</span>
                                )}
                              </span>
                              <Menu menuButton={<MenuButton><MoreVertIcon className="DotsVerticalIcon"/></MenuButton>} transition>
                                <MenuItem onClick={() => { setSelectedBoard(id), setEditBoard(true) }}>Editar</MenuItem>
                                <MenuItem onClick={() => { deleteBoard(id, newBoard, setNewBoard) }}>Excluir</MenuItem>
                              </Menu>
                            </h4>
                            <div className="CardAreaInCollum"
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                              {board.items?.length > 0 &&
                                board.items.map((item: any, iIndex: any) => {
                                  return (
                                    <CardItem key={item.id} data={item} index={iIndex} className="CardItemClass"/>
                                  )
                                })}
                              {provided.placeholder}
                            </div>

                            {editCard && selectedBoard === id ? (
                              <div className="AroundTextAreaAddTask">
                                <textarea id="taskTitle" className="addTaskForm" autoFocus rows={3} placeholder="Descrição do Card"
                                data-id={id} onKeyDown={(e) => createCard(id, e, setEditCard, newBoard, setNewBoard)}/>
                                <button onClick={() => {setEditCard(false)}}>x</button>
                              </div>
                            ) : (
                              <button
                                className="ButtonAddTask"
                                onClick={() => { setSelectedBoard(id), setEditCard(true) }}>
                                <span>Adicionar Card</span>
                                <AddIcon className="PlusCircleIcon"/>
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
