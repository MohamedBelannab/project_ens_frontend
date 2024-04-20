

import React, { useState, useRef } from "react";
import { setUser , setIsloged } from "../slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import Lottie from 'lottie-react'
import approve from '../assets/approve.json'
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
  Chip
} from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Each } from "../components/each/each";

export function Signup() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({});
  const [formation, setFormation] = useState(null);
  let dispatch = useDispatch()
  let [data , setData] = useState({})
  let filiers = useSelector(state => state.formation.formations)
  console.log(filiers);


  const cneRef = useRef(null);
  const fullnameRef = useRef(null);
  const passwordRef = useRef(null);
  const teleRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handleOpen = () => setOpen((prevOpen) => !prevOpen);

  const goBack = () =>{
    if (activeStep !=0) {
      setActiveStep((cur) => cur - 1)
    }
  }

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
  const register = async () => {
    await api.post('/register', data).then((response)=>{
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        dispatch(setIsloged());
        dispatch(setUser(response.data.user))
      }
   
    }).catch((err)=>{
          console.log(err);
    })

  }
  const validateInput = async() => {
    const errors = {};
    let isValid = true;
    if (activeStep === 0) {
      const cneValue = cneRef.current.querySelector("input").value.trim();
      const fullnameValue = fullnameRef.current.querySelector("input").value.trim();

      if (!fullnameValue) {
        errors.fullname = "Nom complet est requis";
        isValid = false;
      }else{
        setData((prev)=> ({...prev , prenom : fullnameValue}))
        
      }
      if (!cneValue) {
        errors.cne = "CNE est requis";
        isValid = false;
      } else {
        const isCneValid = await checkCne(cneValue);
        if (isCneValid) {
          errors.cne = "le CNE existe déjà";
          isValid = false;
        }else{
          setData((prev)=> ({...prev , cne : cneValue}))
        }
      }
      if (Object.keys(errors).length === 0) {
        setActiveStep((cur) => cur + 1)
      }
    }

    if (activeStep === 1) {
      const phoneRegex = /^0{1}[5-8]{1}\d{8}$/;
      const teleValue = teleRef.current.querySelector("input").value.trim();

      if (!formation) {
        errors.formation = "Filière est requise";
        isValid = false;
      }else{
        setData((prev)=> ({...prev , filiere_id : formation}))
      }
      if (!teleValue) {
        errors.tele = "Téléphone est requis";
        isValid = false;
      } else if (!phoneRegex.test(teleValue)) {
        errors.tele = "Le numéro de téléphone doit être au format valide (06XXXXXXX)";
        isValid = false;
      }else{
        setData((prev)=> ({...prev , tele : teleValue}))
      }
      if (Object.keys(errors).length === 0) {
          setActiveStep((cur) => cur + 1)
      }
    }

    if (activeStep === 2) {
      const passwordValue = passwordRef.current.querySelector("input").value.trim();
      const confirmValue = confirmPassRef.current.querySelector("input").value.trim();

      if (!passwordValue) {
        errors.password = "Mot de passe est requis";
        isValid = false;
      } else if (passwordValue.length < 8) {
        errors.password = "Le mot de passe doit comporter au moins 8 caractères";
        isValid = false;
      }
      else if (confirmValue !== passwordValue) {
        errors.confirmPass = "Les mots de passe ne correspondent pas";
        isValid = false;
      }else{
        setData((prev)=> ({...prev , password : passwordValue}))
        setData((prev)=> ({...prev , password_confirme : confirmValue}))
        setActiveStep((cur) => cur + 1)
        
      }
    }


    setError(errors);
    return isValid;
  };

  const submit = async () => {
    if (!validateInput()) {
      return;
    }
    
    if (activeStep === 3) {
      console.log(data);
      register()
      handleOpen()
    }


  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue" size="sm">
        S'inscrire
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Typography variant="h4" color="blue-gray">
              S'inscrire
              </Typography>
              <Chip onClick={goBack} size="sm" className=" cursor-pointer"  icon={<ArrowUturnLeftIcon/>} color="blue" />
            </div>
            
            <Typography className="font-normal" variant="paragraph" color="gray">
              {activeStep === 3 ? "cliquez sur Terminer pour terminer l'inscription" : "Ravi de vous rencontrer! Entrez vos coordonnées pour vous inscrire."}
           
            </Typography>

            {activeStep === 0 && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Nom complet
                </Typography>
                <Input
                  label="Nom complet"
                  error={error.fullname}
                  ref={fullnameRef}
                  name="fullname"
                  className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
                  size="lg"
                />
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

                <Typography className="-mb-2" variant="h6">
                  CNE
                </Typography>
                <Input
                  label="CNE"
                  error={error.cne}
                  ref={cneRef}
                  name="cne"
                  className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
                  size="lg"
                />
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
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Filière
                </Typography>
                <Select
                  color="blue"
                  error={error.formation}
                  name="formation"
                  label="Sélectionnez Filière"
                  value={formation}
                  onChange={(val) => setFormation(val)}
                >
                  {filiers && filiers.map((item , index) => <Option key={index} value={item.id}>{item.nomFilier}</Option> )}
                 
                  
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

                <Typography className="-mb-2" variant="h6">
                  Téléphone
                </Typography>
                <Input
                  label="Téléphone"
                  error={error.tele}
                  ref={teleRef}
                  name="tele"
                  className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
                  size="lg"
                />
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
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Mot de passe
                </Typography>
                <Input
                  type="password"
                  label="Mot de passe"
                  error={error.password}
                  ref={passwordRef}
                  name="password"
                  className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
                  size="lg"
                />
                {error.password && (
                  <>
                  
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
                  </>
                  
                )}

                <Typography className="-mb-2" variant="h6">
                  Confirme mot de passe
                </Typography>
                <Input
                  type="password"
                  label="Confirme mot de passe"
                  error={error.confirmPass}
                  ref={confirmPassRef}
                  name="confirmPass"
                  className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
                  size="lg"
                />
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
              </>
            )}
            {
              activeStep === 3 && 
              <div className="flex items-center justify-center w-full">
                <Lottie className='w-[80%]'   animationData={approve} />  
              </div>
              
            }

          </CardBody>
          <CardFooter className="pt-0">
            <Button color="blue" variant="gradient" onClick={submit} fullWidth>
               {activeStep === 3 ? "Terminer" : "Suivant(e)"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Vous n'avez pas de compte ?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Se connecter
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
