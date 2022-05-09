import React, { KeyboardEvent, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IBoardItem, createId } from '../pages/index'

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

  const [selectedComment, setSelectedComment] = useState(0)
  const [newComment, setNewComment] = useState(data)
  const [editComment, setEditComment] = useState(true)

  const addComment = (id:number, e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      const val = e.currentTarget.value
      let dataId:any = id

      const comment = {
        id: createId(),
        content: val
      }

      let newComment: IBoardItem[] = []
      newComment.forEach((board) => board.obs?.forEach((obs) => {
        if (obs.id === dataId) {
          obs.push(comment)
        }
      }))
      setNewComment(newComment)
    }
  }

  function editCommentAction(value: number, e: KeyboardEvent<HTMLTextAreaElement>) {
    let id = value

    let commentFinal = [...dataT]
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
    console.log(id)
    
    setNewComment(data.obs?.splice(id, 1))
    console.log(data.obs)
  }

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
              X
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
                          Endereço: {info.endereço}
                      </Typography>
                  </li>
                )
              })}
                <Typography>
                  {data.obs?.map((o) => (
                    <ul key={o.id}>
                      {editComment ? (
                        <li className='commentsListItem'>{o.content}
                          <p>
                            <a onClick={() => (setSelectedComment(o.id), setEditComment(false), (e: any) => editCommentAction(id, e))}>✍️</a>
                            <a onClick={() => (deleteComment(o.id))}>🗑️</a>
                          </p>
                        </li>
                      ) : (
                        <a className="editCommentForm">
                          <textarea className="editCommentText" autoFocus rows={1} onKeyDown={(e) => editCommentAction(o.id, e)}>
                            {o.content}
                          </textarea>
                          <button onClick={() => {setEditComment(true)}}>x</button>
                        </a>
                      )}
                    </ul>
                  ))}
                  <p>
                    <textarea className="addCommentForm" rows={1} placeholder={'Adicionar Comentário'}
                              onKeyDown={(e) => addComment(data.id, e)} />
                  </p>
                </Typography>
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}