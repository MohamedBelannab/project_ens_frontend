


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
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import api from "../../../api/api";
import { addStudent } from '../../../slices/studentSlice';
 
export function AddStudent() {
  const [open, setOpen] = React.useState(false);
  const cneRef = useRef(null);
  const fullnameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);
  const teleRef = useRef(null);

  const [error, setError] = useState({});
  const [formation, setFormation] = useState('');
  let [active , setActive] = useState(false)
  const dispatch = useDispatch();

  const checkCne = async (cneValue) => {
    try {
      const response = await api.get(`/checkcne/${cneValue}`);
      if (response.status === 200) {
        const { success } = response.data;
        if (!success) {
          return true; // CNE is valid
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error("Error checking CNE:", error);
      return false;
    }
  };

  const validateInput = async () => {
    const errors = {};
    let isValid = true;
  
    const fullnameValue = fullnameRef.current.querySelector("input").value.trim();
    const phoneRegex = /^0{1}[5-8]{1}\d{8}$/;
    const teleValue = teleRef.current.querySelector("input").value.trim();
    const passwordValue = passwordRef.current.querySelector("input").value.trim();
    const confirmValue = confirmPassRef.current.querySelector("input").value.trim();
    const cneValue = cneRef.current.querySelector("input").value.trim();
  
    if (!fullnameValue) {
      errors.fullname = "Nom complet est requis";
      isValid = false;
    } 
    if (!cneValue) {
      errors.cne = "CNE est requis";
      isValid = false;
    } else {
      const isCneValid = await checkCne(cneValue);
      if (isCneValid) {
        errors.cne = "Le CNE existe déjà";
        isValid = false;
      }
    }
  
    if (!teleValue) {
      errors.tele = "Téléphone est requis";
      isValid = false;
    } else if (!phoneRegex.test(teleValue)) {
      errors.tele = "Le numéro de téléphone doit être au format valide (06XXXXXXX)";
      isValid = false;
    }
  
    if (!formation) {
      errors.formation = "Filière est requise";
      isValid = false;
    }
    if (!passwordValue) {
      errors.password = "Mot de passe est requis";
      isValid = false;
    } else if (passwordValue.length < 8) {
      errors.password = "Le mot de passe doit comporter au moins 8 caractères";
      isValid = false;
    } else if (confirmValue !== passwordValue) {
      errors.confirmPass = "Les mots de passe ne correspondent pas";
      isValid = false;
    }
  
    setError(errors);
    return isValid;
  };

  const submit = async () => {
    if (await validateInput()) {
      dispatch(addStudent( {
        cne : cneRef.current.querySelector("input").value.trim() ,
        prenom : fullnameRef.current.querySelector("input").value.trim() ,
        status : active,
        tele : teleRef.current.querySelector("input").value.trim() ,
        password : passwordRef.current.querySelector("input").value.trim() ,
        password_confirme : confirmPassRef.current.querySelector("input").value.trim() ,
        filiere_id : formation 
      }))

      handleOpen()

    }
  };

 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
    <Button onClick={handleOpen} className="flex items-center gap-3" size="sm">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter 
    </Button>
            
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="" variant="h4">
            Ajouter un étudiant
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
          <Input  color="blue" error={error.fullname} name='fullname' ref={fullnameRef} label="nom et prénom" />
          {error.fullname && (
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
                    <span>{error.fullname}</span>
                  </Typography>
            )}
            <Input  color="blue" error={error.cne} name='cne' ref={cneRef} label="CNE" />
          {error.cne && (
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
                    <span>{error.cne}</span>
                  </Typography>
            )}
            <Input color="blue"  ref={teleRef} error={error.tele} name='tele' label="Téléphone" />
          {error.tele && (
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
                    <span>{error.tele}</span>
                  </Typography>
            )}
            <Select
            color="blue"
            label="Sélectionnez Filière"
            error={error.formation}
            name="formation"
            value={formation}
            onChange={(val) => setFormation(val)}
            >
            <Option value="1">Filière 1</Option>
            <Option value="2">Filière 2</Option>
            </Select>
            {error.formation && (
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
                    <span>{error.formation}</span>
                  </Typography>
            )}
            <Input  color="blue" error={error.password} type='password' name='password' ref={passwordRef} label="Mot de passe" />
          {error.password && (
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
                    <span>{error.password}</span>
                  </Typography>
            )}
          <Input color="blue"  error={error.confirmPass} type='password' ref={confirmPassRef} label="Confirme mot de passe" />
          {error.confirmPass && (
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
                    <span>{error.confirmPass}</span>
                  </Typography>
            )}
            <div className="flex gap-10">
                <Radio name="type"  onClick={()=>{setActive(true)}}  label="Activé" />
                <Radio name="type" onClick={()=>{setActive(false)}} label="Inactif" defaultChecked />
            </div>
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