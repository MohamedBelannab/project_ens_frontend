
// import React from "react";
// import { setUser , setIsloged } from "../slices/loginSlice";
// import { useDispatch } from "react-redux";
// import { useState , useRef } from "react";
// import { Spinner } from "@material-tailwind/react";
// import api from "../api/api";
// import {
//   Button,
//   Dialog,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Checkbox,
// } from "@material-tailwind/react";
 
// export function Login() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen((cur) => !cur);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({});
//   let [data , setData] = useState({})
//   let dispatch = useDispatch()
//   const cneRef = useRef(null);
//   const passwordRef = useRef(null);

//   const checkCne = async (cneValue, errors) => {
//     try {
//       const response = await api.get(`/checkcne/${cneValue}`);
//       if (response.status === 200) {
//         const { success } = response.data;
//         if (!success) {
//           setData((prev)=> ({...prev , cne : cneValue}))
//         } else {
//           setError((prev) => ({...prev , cne : "Le CNE non  existe "}));
//         }
//       }
//     } catch (error) {
//       console.error("Error checking CNE:", error);
//     }
//   };

//   const validateInput = () => {
//     const errors = {};
//     let isValid = true;
//     const cneValue = cneRef.current.querySelector("input").value.trim();
//     const passwordValue = passwordRef.current.querySelector("input").value.trim();
//     if (!cneValue) {
//       errors.cne = "CNE est requis";
//       isValid = false;
//     } else {
//       checkCne(cneValue, errors);
//     }

//     if (!passwordValue) {
//       errors.password = "Mot de passe est requis";
//       isValid = false;
//     } else if (passwordValue.length < 8) {
//       errors.password = "Le mot de passe doit comporter au moins 8 caractères";
//       isValid = false;
//     }else{
//       setData((prev)=> ({...prev , password : passwordValue}))
//     }
    
//     setError(errors);
//     return isValid;
//   };
//   const login = async () => {
//     setLoading(true)
//     await api.post('/login', data).then((response)=>{
//       if (response.status === 200) {
//         localStorage.setItem('token', JSON.stringify(response.data.token));
//         dispatch(setIsloged());
//         dispatch(setUser(response.data.user))
//         setLoading(false)
//       }
   
//     }).catch((err)=>{
//           let validate = err.response.data
//           console.log(validate);
//           setLoading(false)
//     })

//   }
//   const submit = async () => {
//     if (!validateInput()) {
//       return;
//     }
//     console.log(data);
//     login()
//     handleOpen()

//   };


 
//   return (
//     <>
//         <Button onClick={handleOpen} variant="text" size="sm" color="blue-gray">
//         se connecter
//         </Button>
//       <Dialog
//         size="xs"
//         open={open}
//         handler={handleOpen}
//         className="bg-transparent shadow-none"
//       >
//         <Card className="mx-auto w-full max-w-[24rem]">
//           <CardBody className="flex flex-col gap-4">
//             <Typography variant="h4" color="blue-gray">
              
//               Se connecter
//             </Typography>
//             <Typography
//               className="mb-3 font-normal"
//               variant="paragraph"
//               color="gray"
//             >
//               Entrez votre CNE et mot de passe pour vous connecter.
//             </Typography>
//             <Typography className="-mb-2" variant="h6">
//                   CNE
//             </Typography>
//             <Input
//               label="CNE"
//               error={error.cne}
//               ref={cneRef}
//               name="cne"
//               className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
//               size="lg"
//             />
//             {error.cne && (
//               <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal text-red-500 text-xs">
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="-mt-px h-4 w-4 text-red-500"
//                 >
//                 <path
//                   fillRule="evenodd"
//                   d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//                 <span>{error.cne}</span>
//               </Typography>
//             )}
//             <Typography className="-mb-2" variant="h6">
//                Mot de passe
//             </Typography>
//             <Input
//               type="password"
//               label="Mot de passe"
//               error={error.password}
//               ref={passwordRef}
//               name="password"
//               className="disabled:bg-blue-50 outline-none placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200 border-blue-200 focus:border-blue-500"
//               size="lg"
//             />
//             {error.password && (
//               <>
              
//               <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal text-red-500 text-xs">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="-mt-px h-4 w-4 text-red-500"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//                 <span>{error.password}</span>
//               </Typography>
//               </>
              
//             )}
//             <div className="-ml-2.5 -mt-3">
//               <Checkbox label="Remember Me" />
//             </div>
//           </CardBody>
//           <CardFooter className="pt-0">
//             <Button color="blue" variant="gradient" onClick={submit} fullWidth>
//               { loading ? <Spinner color="white"/> : "Se connecter"}
//             </Button>
//             <Typography variant="small" className="mt-4 flex justify-center">
//               Vous n&apos;avez pas de compte ?
//               <Typography
//                 as="a"
//                 href="#signup"
//                 variant="small"
//                 color="blue-gray"
//                 className="ml-1 font-bold"
//                 onClick={handleOpen}
//               >
//                 S'inscrire
//               </Typography>
//             </Typography>
//           </CardFooter>
//         </Card>
//       </Dialog>
//     </>
//   );
// }


import React, { useState, useRef } from "react";
import { setUser, setIsloged } from "../slices/loginSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import api from "../api/api";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

export function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const cneRef = useRef(null);
  const passwordRef = useRef(null);

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
    const cneValue = cneRef.current.querySelector("input").value.trim();
    const passwordValue = passwordRef.current.querySelector("input").value.trim();
    if (!cneValue) {
      errors.cne = "CNE est requis";
      isValid = false;
    } else {
      const isCneValid = await checkCne(cneValue);
      if (!isCneValid) {
        errors.cne = "Le CNE n'existe pas";
        isValid = false;
      }
    }

    if (!passwordValue) {
      errors.password = "Mot de passe est requis";
      isValid = false;
    } else if (passwordValue.length < 8) {
      errors.password = "Le mot de passe doit comporter au moins 8 caractères";
      isValid = false;
    }
    
    setError(errors);
    return isValid;
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await api.post('/login', {
        cne: cneRef.current.querySelector("input").value.trim(),
        password: passwordRef.current.querySelector("input").value.trim(),
      });
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        dispatch(setIsloged());
        dispatch(setUser(response.data.user));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError({ general: "Erreur lors de la connexion" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (await validateInput()) {
      login();
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="text" size="sm" color="blue-gray">
        Se connecter
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={() => setOpen(false)}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Se connecter
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Entrez votre CNE et mot de passe pour vous connecter.
            </Typography>
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
            {error.general && (
              <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal text-red-500 text-xs">
                <span>{error.general}</span>
              </Typography>
            )}
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="blue" variant="gradient" onClick={handleSubmit} fullWidth>
              {loading ? <Spinner color="white" /> : "Se connecter"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Vous n'avez pas de compte ?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => setOpen(false)}
              >
                S'inscrire
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
