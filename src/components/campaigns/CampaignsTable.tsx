import React, {useState} from 'react'
import Campaign from "@/src/types/Campaign";
import StatusBadge from "@/src/components/StatusBadge";
import {ReusableTable} from "@/src/components/ReusableTable";
import IMeta from "@/src/types/Meta";
import {BsThreeDots} from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
    campaigns: Campaign[];
    meta: IMeta | [];
}

const CampaignsTable = ({campaigns, meta}: Props) => {

    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    const columns = [
        {header: "ID", accessor: "externalId" as const},
        {header: "Title", accessor: "title" as const},
        {header: "Created At", accessor: "createdAt" as const},
        {header: "Status", accessor: "status" as const, cell: (row:Campaign) => <StatusBadge status={row.status} />},
    ];

    const rowActions = (campaign: Campaign) => (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                    <BsThreeDots className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedCampaign?.title ?? ""}</DialogTitle>
                </DialogHeader>
                <div className="space-y-1">
                    <div className="space-x-2">
                        <span className="font-semibold ">ID:</span>
                        <span className="capitalize">{selectedCampaign?.externalId}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Message:</span>
                        <span>{campaign.message}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Interest Categories:</span>
                        {selectedCampaign?.interestCategories.map((category, index) => (
                            <div key={index}>- {category.name}</div>
                        ))}
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Status:</span>
                        <span className="capitalize">{selectedCampaign?.status}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Created At:</span>
                        <span className="capitalize">{selectedCampaign?.createdAt}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Updated At:</span>
                        <span className="capitalize">{selectedCampaign?.updatedAt}</span>
                    </div>
                    <div className="space-x-2">
                        <span className="font-semibold ">Delivered Messages/Total Messages:</span>
                        <span className="capitalize">{selectedCampaign?.deliveredMessages}/{selectedCampaign?.totalRecipients}</span>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );

    return (
        <ReusableTable columns={columns}
                       data={campaigns}
                       meta={meta}
                       cardHeaderData={ <div className="flex flex-col items-left ">
                           <h2 className="text-lg text-textColor-150 font-bold">
                               Campaigns
                           </h2>
                       </div>}
                       rowActions={rowActions}
        />
    )
}
export default CampaignsTable
