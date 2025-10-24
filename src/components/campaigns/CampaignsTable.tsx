import React, {useState} from 'react'
import StatusBadge from "@/src/components/StatusBadge";
import {ReusableTable} from "@/src/components/ReusableTable";
import IMeta from "@/src/types/Meta";
import {Button} from "@/components/ui/button";
import CreateCampaignForm from "@/src/components/campaigns/CreateCampaignForm";
import InterestCategory from "@/src/types/InterestCategory";
import {CustomModal} from "@/src/components/CustomModal";
import {Campaign} from "@/src/types/Campaign";

interface Props {
    campaigns: Campaign[];
    meta: IMeta | [];
    interestCategories: InterestCategory[]
    handlePageChange?: (page: string | number) => void;
}

const CampaignsTable = ({campaigns, meta, interestCategories, handlePageChange}: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [userDetails, setUserDetails] = useState({
        bearerToken: "",
        externalId: ""
    })

    const handleClose = () => {
        setIsOpen(false)
    }
    const columns = [
        {header: "ID", accessor: "externalId" as const},
        {header: "Title", accessor: "title" as const},
        {header: "Created At", accessor: "createdAt" as const},
        {header: "Status", accessor: "status" as const, cell: (row: Campaign) => <StatusBadge status={row.status}/>},
        {header: "Message", accessor: "message" as const},
    ];


    return (
        <ReusableTable columns={columns}
                       data={campaigns}
                       meta={meta}
                       onPageChange={handlePageChange}
                       cardHeaderData={<div className="flex items-center justify-between ">
                           <h2 className="text-lg text-textColor-150 font-bold">
                               Campaigns
                           </h2>
                           <div>
                               <>
                                   <Button onClick={() => setIsOpen(true)}>Create Campaign</Button>
                                   <CustomModal isOpen={isOpen} onClose={handleClose} title="Create Campaign" size="md">
                                       <CreateCampaignForm interestCategories={interestCategories}
                                                           handleClose={handleClose}
                                       />
                                   </CustomModal>
                               </>
                           </div>
                       </div>}
        />
    )
}
export default CampaignsTable
