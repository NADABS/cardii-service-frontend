import React, {useState} from 'react'
import StatusBadge from "@/src/components/StatusBadge";
import {ReusableTable} from "@/src/components/ReusableTable";
import IMeta from "@/src/types/Meta";
import {Button} from "@/components/ui/button";
import CreateCampaignForm from "@/src/components/campaigns/CreateCampaignForm";
import {CustomModal} from "@/src/components/CustomModal";
import {Campaign} from "@/src/types/Campaign";

interface Props {
    campaigns: Campaign[];
    meta: IMeta | [];
    handlePageChange?: (page: string | number) => void;
}

const CampaignsTable = ({campaigns, meta, handlePageChange}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const handleClose = () => {
        setIsOpen(false)
    }

    const columns = [
        {header: "ID", accessor: "internalId" as const},
        {header: "Title", accessor: "name" as const},
        {header: "Message", accessor: "message" as const},
        {header: "Status", accessor: "status" as const, cell: (row: Campaign) => <StatusBadge status={row.status}/>},
        {header: "Date Created", accessor: "createdAt" as const},
    ];


    return (
        <ReusableTable title="Campaigns"
                       columns={columns}
                       data={campaigns}
                       meta={meta}
                       onPageChange={handlePageChange}
                       headerRight={<div className="flex items-center justify-between">
                           <div>
                               <Button onClick={() => setIsOpen(true)}>Create Campaign</Button>
                               <CustomModal isOpen={isOpen} onClose={handleClose} title="Create Campaign" size="md">
                                   <CreateCampaignForm handleClose={handleClose}/>
                               </CustomModal>
                           </div>
                       </div>}
        />
    )
}
export default CampaignsTable
