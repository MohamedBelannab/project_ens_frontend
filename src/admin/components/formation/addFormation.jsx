

import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select ,
  Option,
  Radio
} from "@material-tailwind/react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { addForamtion } from "../../../slices/formationSlice";
export function AddForamtion() {
  const [open, setOpen] = React.useState(false);
  const nomFilierRef = useRef(null);
  const [error, setError] = useState({});
  const [departement, setDepartement] = useState('');
  const dispatch = useDispatch();

  const validateInput = async () => {
    const errors = {};
    let isValid = true;
  
    const nomFilierValue = nomFilierRef.current.querySelector("input").value.trim();
    if (!nomFilierValue) {
      errors.nomFilier = "Nom formation est requis";
      isValid = false;
    } 
    if (!departement) {
      errors.departement = "departement est requise";
      isValid = false;
    }

    
    setError(errors);
    return isValid;
  };

  const submit = async () => {
    if (await validateInput()) {
      dispatch(addForamtion( {
        nom_filier : nomFilierRef.current.querySelector("input").value.trim() ,
        department_id : departement
      }))

      handleOpen()

    }
  };

 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
    <Button onClick={handleOpen} className="flex items-center gap-3" size="sm">
        <BookOpenIcon strokeWidth={2} className="h-4 w-4" /> Ajouter 
    </Button>
            
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="" variant="h4">
            Ajouter un formation
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
          <Input  color="blue" error={error.nomFilier} name='nomFilier' ref={nomFilierRef} label=" Nom de Formation" />
          {error.nomFilier && (
                  <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal text-red-500 text-xs">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                    <span>{error.nomFilier}</span>
                  </Typography>
            )}
            <Select
            color="blue"
            label="Sélectionnez Departement"
            error={error.departement}
            name="departement"
            value={departement}
            onChange={(val) => setDepartement(val)}
            >
            <Option value="1">Filière 1</Option>
            <Option value="2">Filière 2</Option>
            </Select>
            {error.departement && (
                  <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal text-red-500 text-xs">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                    <span>{error.departement}</span>
                  </Typography>
            )}
         
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" onClick={submit} color="blue" >
          Ajouter 
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}