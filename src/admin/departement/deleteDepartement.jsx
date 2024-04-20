import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { DeleteDepartement as departementDelete, setDepartementStatus } from "../../slices/departementSlice";
 
export function DeleteDepartement({id , name}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const deleteDepartement = () =>{
    dispatch(departementDelete({nameData : "departement" , id : id}))
    dispatch(setDepartementStatus('idle'))
    handleOpen()
  }

 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Tooltip content="Remove User">
        <IconButton  onClick={handleOpen} className="ml-2" color="red" variant="text">
            <TrashIcon className="h-4 w-4" />
        </IconButton>
        </Tooltip>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
          Votre attention est requise !
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">

          <ExclamationCircleIcon className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            
            Tu devrais lire ça !
          </Typography>
          <Typography className="text-center font-normal">
            Voulez-vous vraiment supprimer cet Departement {name}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
          fermer
          </Button>
          <Button onClick={deleteDepartement} color="blue" variant="gradient" >
          Ok, je l'ai compris
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}