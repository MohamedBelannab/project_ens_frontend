import React, { useEffect, useState } from 'react';
import StudentCard from './studentCard';
import { Select, Option, Input } from "@material-tailwind/react";
import { Each } from '../each/each';
import { useSelector } from 'react-redux';
import moment from 'moment';
import LoadingSearch from '../skeleton/loadingSearch';

const StudentList = () => {
    const students = useSelector((state) => state.student.students);
    const filieres = useSelector(state => state.formation.formations);
    
    const [formation, setFormation] = useState('');
    const [annee, setAnnee] = useState('');
    const [name, setName] = useState('');
    const [years, setYears] = useState([]);

    const filteredRows = students.filter(row => 
        row.prenom.toLowerCase().includes(name.toLowerCase()) &&
        row.filiere.nomFilier.toLowerCase().includes(formation.toLowerCase()) &&
        moment(row.createdAt).format("YYYY").includes(annee)
    );

    useEffect(() => {
        const startYear = 2019;
        const currentYear = new Date().getFullYear();
        const yearsArray = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index).reverse();
        setYears(yearsArray);
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Annuaire des étudiants</h1>
                </div>
                <div className="space-y-4">
                    <div className="w-full max-w-xs flex gap-x-2">
                        <Input value={name} onChange={(e) => setName(e.target.value)} color="blue" label="Recherche Par Nom" />
                        <Select color="blue" label="Select Filière" name="formation" value={formation} onChange={(val) => setFormation(val)}>
                            {filieres && filieres.map((item, index) => (
                                <Option key={index} value={item.nomFilier}>{item.nomFilier}</Option>
                            ))}
                        </Select>
                        <Select name='years' value={annee} onChange={(value) => setAnnee(value)} color="blue" label="Select Année">
                            {years && years.map((item, index) => (
                                <Option key={index} value={item.toString()}>{item}</Option>
                            ))}
                        </Select>
                    </div>
                    {filteredRows.length > 0 ? <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <Each of={filteredRows} render={(item, index) => <StudentCard key={index} item={item} index={index} />} />
                    </div> : <LoadingSearch/> }
                   
                </div>
            </div>
        </div>
    );
}

export default StudentList;
