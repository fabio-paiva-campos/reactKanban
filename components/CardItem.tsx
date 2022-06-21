import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TransitionsModal from './Modal'
import { useAppContext } from '../hooks/Context';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import { setPriority } from './functions/CardItem/setPriority';
import { deleteCard } from './functions/CardItem/deleteCard';

function CardItem({ data, index }: any) {
  let newID = data.id.toString()
  let newTitle = data.title
  let newCnpj = data.cnpj
  let newPorte = data.porte

  const [newBoard, setNewBoard] = useAppContext()

  let newPriorityColor =
    data.priority === 0
      ? 'LabelPriorityCardGreen'
      : data.priority === 1
      ? 'LabelPriorityCardOrange'
      : 'LabelPriorityCardRed'

  let newPriorityTitle =
    data.priority === 0
      ? 'Baixa Prioridade'
      : data.priority === 1
      ? 'Média Prioridade'
      : 'Alta Prioridade'

  let newObs = data.obs
  let newInfo = data.info

  const dataT = {
    id: newID,
    title: newTitle,
    cnpj: newCnpj,
    porte: newPorte,
    priorityColor: newPriorityColor,
    priorityTitle: newPriorityTitle,
    obs: newObs,
    info: newInfo,
  }

  return (
    <Draggable index={index} draggableId={dataT.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="AroundCardGeral"
        >
          <label className={`LabelPriorityCard ${dataT.priorityColor}`}>
            {dataT.priorityTitle}
          </label>
          <Menu menuButton={<MenuButton><MoreVertIcon className="cardMenuIcon"/></MenuButton>}
          direction={'left'} transition>
            <MenuItem onClick={() => {setPriority(data.id, 0, newBoard, setNewBoard)}}>Baixa Prioridade</MenuItem>
            <MenuItem onClick={() => {setPriority(data.id, 1, newBoard, setNewBoard)}}>Média Prioridade</MenuItem>
            <MenuItem onClick={() => {setPriority(data.id, 2, newBoard, setNewBoard)}}>Alta Prioridade</MenuItem>
          </Menu>

          <h5 className="TitleCardItemText">{dataT.title}</h5>
          <h5 className="TitleCardItemText">CNPJ: {dataT.cnpj}</h5>
          <h5 className="TitleCardItemText">
            Porte da Empresa:
            {dataT.porte === 0
              ? ' Pequeno'
              : dataT.porte === 1
              ? ' Médio'
              : ' Grande'}
          </h5>
          
          <div className="InsideAreaCard">
            <ul className="ListCardBottom">
              {data.info.map((index: React.Key | null | undefined) => {
                return <li key={index}></li>
              })}
              <li className='MocalCall'>
                <TransitionsModal data={dataT}/>
              </li>
              <li>
                <span className="chatIcon"><ForumIcon fontSize='small'/>{data.obs.length}</span>
              </li>
              <li>
                <button onClick={() => {deleteCard(data.id, newBoard, setNewBoard)}}><DeleteIcon className='deleteIcon'/></button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
