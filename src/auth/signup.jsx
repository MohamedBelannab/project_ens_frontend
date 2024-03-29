
import React from "react";
import api from "../api/api";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useRef , useState } from "react";
 
export function Signup() {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleOpen = () => setOpen((cur) => !cur);

  const formData = new FormData();

  let [loading,setLoading] = useState(false)
  let [error , setError] = useState({})
  let cne = useRef(null)
  let fullname = useRef(null)
  let password = useRef(null)
  let tele = useRef(null)
  let confirmPass = useRef(null)
  const checkCne = async(cne )=>{
      await api.get('/checkcne/'+cne
    ).then((response)=>{
      if (response.status == 200) {
        let success = response.data 

        if (success && success.success) {
          setActiveStep((cur) => cur + 1)
        }else{
          setError({cne : "Le CNE existe déjà"})
        }
      }
    
    })
  }
  const validateInput = () => {
    if (activeStep === 0) {
      const cneValue = cne.current.querySelector("input").value.trim()
      if (!cneValue) {
        setError({cne : "CNE est requis"})
      }else{
        checkCne(cneValue)
      }  
      
    }
    if (activeStep === 1) {
      const fullnameValue = fullname.current.querySelector("input").value.trim()
      const phoneRegex = /^0{1}[5-8]{1}\d{8}$/;
      const teleValue = tele.current.querySelector("input").value.trim()
      const errors = {};
      if (!fullnameValue) {
        errors.fullname = "Nom complet est requis";
      }
      if (!teleValue) {
        errors.tele = "Téléphone est requis";
      }
      else if (!phoneRegex.test(teleValue)) {
        errors.tele = "Le numéro de téléphone doit être au format valide (06XXXXXXX)";
      }

      setError(errors)
      if (Object.keys(errors).length === 0) {
        setActiveStep((cur) => cur + 1)
      }
      
    }
    if (activeStep === 2) {
      const passwordValue = password.current.querySelector("input").value.trim()
      const confirmValue = confirmPass.current.querySelector("input").value.trim()
      const errors = {};
      if (!passwordValue) {
        errors.password = "Mot de passe est requis";
      }else if(passwordValue.length < 8 ){
        errors.password = "Le mot de passe doit comporter au moins 8 caractères";
      }
      if (confirmValue !== passwordValue) {
        errors.confirmPass = "Les mots de passe ne correspondent pas";
      }

      setError(errors)
      
    }

    
  
    return Object.keys(error).length === 0;
  };
  let submit = async () => {
    
    if (!validateInput()) {
      return;
    }

   formData.append()
    setLoading(true);
    await axios.post('/register', {
      cne: cne.current.value,
      prenom: fullname.current.value,
      tele: password.current.value,
      password: tele.current.value,
    }, {
      withCredentials: true,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    }).then((response)=>{
      localStorage.setItem('token', JSON.stringify(response.data.data.token));
      dispatch(setIsloged());
      setLoading(false); 
      navigate('/');
    
    }).catch((err)=>{
          let validate = err.response.data
          console.log(validate);
        
    })

    
  }
 
  return (
    <>
    <Button   onClick={handleOpen} variant="gradient" color="blue" size="sm">
        s'inscrire
        </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              
            s'inscrire
            </Typography>
            <Typography
              className="font-normal "
              variant="paragraph"
              color="gray"
            >
             Ravi de vous rencontrer! Entrez vos coordonnées pour vous inscrire.
            </Typography>
            {
              activeStep === 0 && 
              <>
                <Typography className="-mb-2" variant="h6">
                  CNE
                </Typography>
                <Input label="CNE" error={error.cne ? true : false} ref={cne} name="cne" className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg" />
                {
                  error &&  error.cne &&
                  <Typography
                variant="small"
                color="gray"
                className=" flex items-center gap-1 font-normal  text-red-500"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4  text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {error  ? error.cne : ""}
                  </Typography>
                }
              </>
              
            }

            {
              activeStep === 1 &&
              <>
                <Typography className="-mb-2" variant="h6">
                Nom complet 
                </Typography>
                <Input label="Nom complet" error={error.fullname ? true : false} ref={fullname} name="prenom" className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg" />
                {
                  error &&  error.fullname &&
                  <Typography
                  variant="small"
                color="gray"
                className=" flex items-center gap-1 font-normal  text-red-500 text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4  text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error.fullname}
                  </Typography>
                }
                <Typography className="-mb-2" variant="h6">
                Téléphone
                </Typography>
                <Input label="Téléphone" error={error.tele ? true : false} ref={tele} name="tele" className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg" />
                {
                  error &&  error.tele &&
                  <Typography
                  variant="small"
                color="gray"
                className=" flex items-center gap-1 font-normal  text-red-500 text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4  text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error.tele}
                  </Typography>
                }
              </>
              

            }
            {
              activeStep === 2 &&
              <>
                <Typography className="-mb-2" variant="h6">
                Mot de passe 
                </Typography>
                <Input type="password" label="Mot de passe " error={error.password ? true : false} ref={password} name="prenom" className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg" />
                {
                  error &&  error.password &&
                  <Typography
                  variant="small"
                color="gray"
                className=" flex items-center gap-1 font-normal  text-red-500 text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4  text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error.password}
                  </Typography>
                }
                <Typography className="-mb-2" variant="h6">
                Confirme mot de passe
                </Typography>
                <Input type="password" label="Confirme mot de passe" error={error.confirmPass ? true : false} ref={confirmPass} name="confirmPass" className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg" />
                {
                  error &&  error.confirmPass &&
                  <Typography
                  variant="small"
                color="gray"
                className=" flex items-center gap-1 font-normal  text-red-500 text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4  text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error.confirmPass}
                  </Typography>
                }
              </>
              

            }



            
            
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="blue" variant="gradient" onClick={submit} fullWidth>
                Suivant(e)
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Vous n&apos;avez pas de compte ?
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