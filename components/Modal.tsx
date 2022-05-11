import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import CloseIcon from '@mui/icons-material/Close';

import { IBoardItem } from '../pages/index'

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
  comments: any
}

export default function TransitionsModal({ data, comments }: IOnlyData) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
                          Endereço: {info.endereço}
                      </Typography>
                  </li>
                )
              })}
            </ul>
              <p className='divider'></p>
              <p className='commentsLabel'>Observações:</p>
              {comments}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
