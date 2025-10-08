import React from 'react'
import {CiSearch, CiWavePulse1} from "react-icons/ci";
import {IoTerminalOutline} from "react-icons/io5";
import {ReusableTable} from "@/src/components/ReusableTable";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {formatStatus, statusColourMap} from "@/src/lib/utils";
import {HiClock} from "react-icons/hi2";
import {BsThreeDots} from "react-icons/bs";

export const CurrentTasksTable = () => {

    // <div className="flex space-x-2">
    //                 <div className="w-6 h-6 rounded-full bg-[#DFE5EF] flex justify-center items-center">
    //                     <CiWavePulse1 />
    //                 </div>
    //                 <p>Product Review for UI Market</p>
    //             </div>

    const tasks = [
        {title:{
                icon: <CiWavePulse1 />,
                text: "Product Review for UI Market"
            },
            status: "In Progress",
            duration: 4,
        },
        { title: {
            icon: <CiSearch />,
            text: "UX Research for Product"
            },
            status: "On Hold",
            duration: 6,
        },
        {
            title: {
                icon: <IoTerminalOutline />,
                text: "App Design and Development"
            },
            status: "Done",
            duration: 16,
        }
    ]

    const mockMeta = {
        currentPage: 0,
        firstPage: 0,
        lastPage: 0,
        perPage: 0,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0,
    }

    return (
        <Table>
            <TableBody>
                {tasks.map((task, index)=> (
                    <TableRow key={index} >
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-[#DFE5EF] flex justify-center items-center">
                                    {task.title.icon}
                                </div>
                                <p>{task.title.text}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="w-full items-center flex space-x-2">
                                <div className={`w-3 h-3 rounded-full ${statusColourMap[formatStatus(task.status)]}`} />
                                <p>{task.status}</p>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="w-full items-center flex space-x-2">
                                <HiClock size={20} color={"#E5E7EB"}/>
                                <p>{task.duration} hrs</p>
                            </div>
                        </TableCell>
                        <TableCell><BsThreeDots /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

