import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon , TrashIcon} from "@heroicons/react/24/solid";
import { useState , useEffect } from "react";
import { fetchStudents } from "../../../slices/studentSlice";
import { useSelector  , useDispatch} from "react-redux";
import moment from "moment";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { EditStudent } from "../students/editStudent";
import { AddStudent } from "../students/addStudent";
import { DeleteStudent } from "../students/deleteStudent";
 
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
 
const TABLE_HEAD = ["Étudiant", "Informations", "Statut", "Année", ""];

 
  const StudentsDataTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTabs , setSearchTabs] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    let status = useSelector((state) => state.student.status);
    let students = useSelector((state) => state.student.students);
    console.log( "ok" ,students);
    const dispatch = useDispatch()
    const pageSize = 6;
  
    
  
    const filteredRows = students.filter((row) => {
      if (searchTabs === null) {
        return (
          row.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.tele.toLowerCase().includes(searchTerm.toLowerCase()) || 
          row.filiere.nomFilier.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          (row.status === searchTabs) &&
          (row.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.tele.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
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
      if ( status == 'idle') {
       dispatch(fetchStudents())
      }
       
     }, [status]);
  
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
            Liste des étudiants
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
            Voir les informations sur tous les étudiants
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
            Voir tout
            </Button>
            <AddStudent/>
            
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab onClick={(e) => {setSearchTabs(value)}} key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
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
              ({ id , prenom, filiere, cne, tele, createdAt, status  }, index) => {
                const isLast = index === students.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={`https://api.dicebear.com/8.x/initials/svg?seed=${prenom}&backgroundColor=1e88e5`} alt={prenom} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {prenom}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {filiere.nomFilier}
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
                          {cne}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {tele}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status ? "Activé" : "Inactif"}
                          color={status ? "green" : "blue-gray"}
                        />
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
                      <EditStudent id={id}/>
                      <DeleteStudent name={prenom} id={id}/>
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

export default StudentsDataTable