import React, { useState } from 'react'
import { useAppContext } from '../hooks/Context';

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {IBoardItem, createId} from '../hooks/Context'
import { editCommentAction } from './functions/Modal/editCommentAction';
import { deleteComment } from './functions/Modal/deleteComment';
import { addComment } from './functions/Modal/addComment';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export interface IOnlyData {
  data: IBoardItem
}

export default function TransitionsModal({ data }: IOnlyData) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [newBoard, setNewBoard] = useAppContext()
  const [selectedComment, setSelectedComment] = useState(0)
  const [editComment, setEditComment] = useState(false)

  return (
    <div>
      <Button onClick={handleOpen}>+ Info</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        className="Modal"
      >
        <Fade in={open}>
          <Box sx={style}>
            <button className="close-modal" onClick={handleClose}>
              <CloseIcon />
            </button>
            <ul>
              <h2 className="TitleModalInfo">{data.title}</h2>
              {data.info?.map((info, key) => {
                return (
                  <li key={key}>
                      <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                      >
                          Capital Social: {info.capitalSocial}
                          <br />
                          Telefone: {info.telefone}
                          <br />
                          Email: {info.email}
                          <br />
                          Endere??o: {info.endere??o}
                      </Typography>
                  </li>
                )
              })}
            </ul>
              <p className='divider'></p>
              <p className='commentsLabel'>Observa????es:</p>
              <div className='commentsList'>
                {data.obs?.map((o: any) => {
                  return (
                    <div key={o.id}>
                      {editComment && selectedComment === o.id ? (
                        <div className="editCommentForm">
                          <ul>
                            <li>
                              <textarea id="editCommentText" className="editCommentText" autoFocus rows={3} data-id={o.id} defaultValue={o.content}/>
                            </li>
                            <li>
                              <button className="editCommentIcon" onClick={() => {editCommentAction(o.id, newBoard, setNewBoard, setEditComment), setSelectedComment(o.id),
                                setEditComment(!editComment)}}>
                                <CheckIcon />
                              </button>
                              <button className="editCommentIcon" onClick={() => {setSelectedComment(o.id), setEditComment(!editComment)}}>
                                <CloseIcon />
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <ul className='commentsListItem'>
                          <style>{`#p-wrap {white-space: pre-line;}`}</style>
                          <li id="p-wrap" className='commentsListItemText'>{o.content}</li>
                          <li className='commentDateTime'>
                            {o.add}
                          </li>
                          <li className='commentDateTime'>
                            {o.edit}
                          </li>
                          <li className='commentsBottom'>
                            <a onClick={() => (setSelectedComment(o.id), setEditComment(!editComment))}>
                              <EditIcon className="commentEditIcon"/>
                            </a>
                            <a onClick={() => (deleteComment(o.id, newBoard, setNewBoard))}><DeleteIcon className="commentDeleteIcon"/></a>
                          </li>                                           
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
                
              <span className='addCommentArea'>
                <textarea id="addCommentText" className="addCommentForm" rows={1} placeholder={'Adicionar Observa????o'}/>
                <button className="addCommentButton" onClick={() => (addComment(data.id, newBoard, setNewBoard))}><CheckIcon /></button>
              </span>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
