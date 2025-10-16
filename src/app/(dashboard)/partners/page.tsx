import TasksTable from "@/src/components/tasks/TasksTable";
import IMeta from "@/src/types/Meta";
import {Task} from "@/src/types/Task";
import PartnersTable from "@/src/components/partners/PartnersTable";

export default function PartnersPage () {

     const mockPartners = [
        {
            externalId: "EXT-001",
            internalId: "INT-1001",
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+1-555-0101",
            status: "verified",
            preferredChannel: "email",
            deviceType: "desktop",
            location: "New York, USA",
            createdAt: "2023-01-15T10:30:00Z"
        },
        {
            externalId: "EXT-002",
            internalId: "INT-1002",
            name: "Maria Garcia",
            email: "maria.garcia@example.com",
            phone: "+1-555-0102",
            status: "unverified",
            preferredChannel: "sms",
            deviceType: "mobile",
            location: "Los Angeles, USA",
            createdAt: "2023-02-20T14:45:00Z"
        },
        {
            externalId: "EXT-003",
            internalId: "INT-1003",
            name: "David Johnson",
            email: "david.johnson@example.com",
            phone: "+1-555-0103",
            status: "verified",
            preferredChannel: "push",
            deviceType: "tablet",
            location: "Chicago, USA",
            createdAt: "2023-03-10T09:15:00Z"
        },
        {
            externalId: "EXT-004",
            internalId: "INT-1004",
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            phone: "+1-555-0104",
            status: "verified",
            preferredChannel: "email",
            deviceType: "desktop",
            location: "San Francisco, USA",
            createdAt: "2023-04-05T16:20:00Z"
        },
        {
            externalId: "EXT-005",
            internalId: "INT-1005",
            name: "Ahmed Hassan",
            email: "ahmed.hassan@example.com",
            phone: "+1-555-0105",
            status: "unverified",
            preferredChannel: "sms",
            deviceType: "mobile",
            location: "Toronto, Canada",
            createdAt: "2023-05-12T11:00:00Z"
        }
    ];


    const meta: IMeta = {
        currentPage: 1,
        firstPage: 1,
        lastPage: 1,
        perPage: 10,
        nextPageUrl: "/api/items?page=2",
        prevPageUrl: "",
        total: mockPartners.length,
    };

    return (
        <div className="w-full h-full overflow-hidden">
            <PartnersTable
                meta={meta}
                partners={mockPartners}
            />
        </div>
    )
}