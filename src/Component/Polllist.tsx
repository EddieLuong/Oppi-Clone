import { Popper,Box,Button } from '@mui/material';
import {useState} from "react";



export default function Polllist() {
  const [open,setOpen] =useState(false);
  const handleClick = ()=>{
    setOpen(prevValue => !prevValue);
  }

  return(
    <div className="pollist">
          <Button variant="contained" onClick={handleClick}>
            Open Popover
          </Button>
        <Popper  open={open} >
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            The content of the Popper.
          </Box>
        </Popper>
    </div>
  )
};