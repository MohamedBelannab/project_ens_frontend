import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState , useEffect } from "react";
import { useSelector  , useDispatch} from "react-redux";
import moment from "moment";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { fetchDepartement } from "../../../slices/departementSlice";
import { DeleteDepartement } from "../../departement/deleteDepartement";
import { AddDepartement } from "../../departement/addDepartement";
 
const TABS = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Activé",
    value: true,
  },
  {
    label: "Inactif",
    value: false,
  },
];
 
const TABLE_HEAD = ["Départements", "Formation", "Année", ""];

 
  const DepartementDataTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    let departements = useSelector((state) => state.departement.departements);
    let status = useSelector((state) => state.departement.status);
    console.table(departements);
    const dispatch = useDispatch()
    const pageSize = 6;
  
   
  
    const filteredRows = departements.filter((row) => {
        return (
          row.nomDepartement.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
    });
  
    const totalPages = Math.ceil(filteredRows.length / pageSize);
  
    const getVisibleRows = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, filteredRows.length);
      return filteredRows.slice(startIndex, endIndex);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset page to 1 when performing a new search
    };
    useEffect(() => {
      if (status == 'idle') {
       dispatch(fetchDepartement())
      }
       
     }, [status]);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
            Liste des départements
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
            Voir les informations sur tous les départements
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
            Voir tout
            </Button>
            <AddDepartement/>
            
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearch}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              
              getVisibleRows().map(
              ({ id , nomDepartement , createdAt , filiers }, index) => {
                const isLast = index === departements.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={`https://api.dicebear.com/8.x/initials/svg?seed=${nomDepartement}&backgroundColor=1e88e5`} alt={nomDepartement} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nomDepartement}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Ecole Normale Supérieure Tétouan
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {filiers.length } formations
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                           Ecole Normale Supérieure Tétouan
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(createdAt).format("YYYY-MM-DD")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <DeleteDepartement name={nomDepartement} id={id} />
                      {/* <DeleteForamation name={nomFilier} id={id} />
                      <EditFormation id={id} /> */}
                    </td>
                  </tr>
                );
              },
            )}
            
            
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
        Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1}  size="sm">
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default DepartementDataTable