import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TransitionsModal from './Modal'

function CardItem({ data, index, excluir, priority, comments }: any) {
  let newID = data.id.toString()
  let newTitle = data.title
  let newCnpj = data.cnpj
  let newPorte = data.porte

  let newPriorityColor =
    data.priority === 0
      ? 'LabelPriorityCardBlue'
      : data.priority === 1
      ? 'LabelPriorityCardGreen'
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
          {priority}

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
                <TransitionsModal data={dataT} />
              </li>
              <li>
                {comments}
              </li>
              <li>
                {excluir}
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
