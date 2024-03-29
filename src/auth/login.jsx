
import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
        <Button onClick={handleOpen} variant="text" size="sm" color="blue-gray">
        se connecter
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
            <Input label="CNE"  className=" disabled:bg-blue-50   outline-none  placeholder-shown:border-blue-200 placeholder-shown:border-t-blue-200  border-blue-200 focus:border-blue-500 " size="lg"  />
            <Typography className="-mb-2" variant="h6">
               Mot de passe
            </Typography>
            <Input label="Mot de passe" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="blue" variant="gradient" onClick={handleOpen} fullWidth>
              Se connecter
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
                S'inscrire
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}