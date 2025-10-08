import TasksTable from "@/src/components/tasks/TasksTable";
import IMeta from "@/src/types/Meta";
import {Task} from "@/src/types/Task";

export default function Page () {

    const meta: IMeta = {
        currentPage: 1,
        firstPage: 1,
        lastPage: 5,
        perPage: 10,
        nextPageUrl: "/api/items?page=2",
        prevPageUrl: "",
        total: 50,
    };

    const tasks: Task[] = [
        {
            id: "1",
            title: "Design Homepage Layout",
            status: "In Progress",
            completionRate: 65,
            amount: 1500
        },
        {
            id: "2",
            title: "Write API Documentation",
            status: "Completed",
            completionRate: 100,
            amount: 800
        },
        {
            id: "3",
            title: "Fix Login Bug",
            status: "To Do",
            completionRate: 0,
            amount: 500
        },
        {
            id: "4",
            title: "Database Optimization",
            status: "On Hold",
            completionRate: 30,
            amount: 2000
        },
        {
            id: "5",
            title: "Mobile App Testing",
            status: "Completed",
            completionRate: 100,
            amount: 1200
        },
        {
            id: "6",
            title: "User Authentication System",
            status: "In Progress",
            completionRate: 80,
            amount: 1800
        },
        {
            id: "7",
            title: "Deploy to Production",
            status: "To Do",
            completionRate: 0,
            amount: 750
        },
        {
            id: "8",
            title: "Performance Monitoring Setup",
            status: "In Progress",
            completionRate: 45,
            amount: 950
        },
        {
            id: "9",
            title: "Code Review Session",
            status: "Completed",
            completionRate: 100,
            amount: 600
        },
        {
            id: "10",
            title: "Security Audit",
            status: "To Do",
            completionRate: 0,
            amount: 3000
        }
    ];

    return (
        <div className="w-full h-full px-2 pt-8 overflow-hidden">
            <TasksTable
                meta={meta}
                tasks={tasks}
            />
        </div>
    )
}