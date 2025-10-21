'use client';
import React, {useEffect} from "react";
import useFetch from "@/src/hooks/useFetch";
import CreateCampaignForm from "@/src/components/campaigns/CreateCampaignForm";
import {handleError} from "@/src/lib/errorHandler";
import {CustomSpinner} from "@/src/components/CustomSpinner";
import CampaignsTable from "@/src/components/campaigns/CampaignsTable";

export default function CampaignsPage()  {

    const apiBaseUrl = process.env.NEXT_PUBLIC_CARDII_API_BASE_URL;

    const _interestCategories = [
        {
            "externalId": "3418852a-4cf6-4b0d-8866-c4e483cff78b",
            "internalId": "IC20251015163634983079",
            "name": "learner (interested in defensive driving training)",
            "description": "learner (interested in defensive driving training)",
            "createdAt": "2025-10-15 16:36:34",
            "updatedAt": "2025-10-15 16:36:34"
        },
        {
            "externalId": "9f4035ff-e9bc-4980-8f11-4fe1f4322434",
            "internalId": "IC20251015163654573116",
            "name": "car owner / fleet manager",
            "description": "car owner / fleet manager",
            "createdAt": "2025-10-15 16:36:54",
            "updatedAt": "2025-10-15 16:36:54"
        },
        {
            "externalId": "08540e00-940d-4258-bed5-1ceeb643b9c7",
            "internalId": "IC20251015163714234178",
            "name": "driver",
            "description": "driver",
            "createdAt": "2025-10-15 16:37:14",
            "updatedAt": "2025-10-15 16:37:14"
        },
        {
            "externalId": "2ffee9ee-17d7-4ec6-a152-a14333a01047",
            "internalId": "IC20251015164011013517",
            "name": "roadside support(towing / fuel assistance)",
            "description": "roadside support(towing / fuel assistance)",
            "createdAt": "2025-10-15 16:40:11",
            "updatedAt": "2025-10-15 16:40:11"
        }
    ]

    const mockData = [
        {
            externalId: "camp-001",
            title: "Defensive Driving Course Promotion",
            message: "Join our defensive driving course and improve your safety skills! Limited spots available.",
            interestCategories: [_interestCategories[0], _interestCategories[2]],
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-20T14:25:00Z",
            status: "pending",
            totalRecipients: 1250,
            deliveredMessages: 1180
        },
        {
            externalId: "camp-002",
            title: "Fleet Management Solutions",
            message: "Optimize your fleet operations with our comprehensive management tools and services.",
            interestCategories: [_interestCategories[1]],
            createdAt: "2024-01-18T09:15:00Z",
            updatedAt: "2024-01-18T09:15:00Z",
            status: "completed",
            totalRecipients: 850,
            deliveredMessages: 845
        },
        {
            externalId: "camp-003",
            title: "24/7 Roadside Assistance",
            message: "Never get stranded again! Sign up for our premium roadside assistance package.",
            interestCategories: [_interestCategories[3], _interestCategories[1], _interestCategories[2]],
            createdAt: "2024-01-20T16:45:00Z",
            updatedAt: "2024-01-25T11:20:00Z",
            status: "suspended",
            totalRecipients: 2100,
            deliveredMessages: 1950
        },
        {
            externalId: "camp-004",
            title: "Advanced Driver Training",
            message: "Take your driving skills to the next level with our advanced training programs.",
            interestCategories: [_interestCategories[0], _interestCategories[2]],
            createdAt: "2024-01-22T13:10:00Z",
            updatedAt: "2024-01-22T13:10:00Z",
            status: "in progress",
            totalRecipients: "0",
            deliveredMessages: "0"
        },
        {
            externalId: "camp-005",
            title: "Car Maintenance Special",
            message: "Spring maintenance special! Get your vehicle ready for the season ahead.",
            interestCategories: [_interestCategories[1], _interestCategories[2]],
            createdAt: "2024-01-25T08:30:00Z",
            updatedAt: "2024-01-30T15:40:00Z",
            status: "pending",
            totalRecipients: 3200,
            deliveredMessages: 3100
        },
        {
            externalId: "camp-006",
            title: "Emergency Towing Services",
            message: "Fast, reliable towing services available 24/7. Save our number for emergencies!",
            interestCategories: [_interestCategories[3]],
            createdAt: "2024-01-28T11:20:00Z",
            updatedAt: "2024-02-02T10:15:00Z",
            status: "queued",
            totalRecipients: 750,
            deliveredMessages: 680
        },
        {
            externalId: "camp-007",
            title: "Fleet Safety Training",
            message: "Comprehensive safety training programs designed specifically for fleet managers and drivers.",
            interestCategories: [_interestCategories[1], _interestCategories[2], _interestCategories[0]],
            createdAt: "2024-02-01T14:50:00Z",
            updatedAt: "2024-02-01T14:50:00Z",
            status: "failed",
            totalRecipients: "0",
            deliveredMessages: "0"
        },
        {
            externalId: "camp-008",
            title: "Fuel Delivery Service",
            message: "Ran out of fuel? We'll bring it to you! Fast fuel delivery service now available.",
            interestCategories: [_interestCategories[3], _interestCategories[1]],
            createdAt: "2024-02-03T09:05:00Z",
            updatedAt: "2024-02-08T16:30:00Z",
            status: "completed",
            totalRecipients: 1500,
            deliveredMessages: 1495
        },
        {
            externalId: "camp-009",
            title: "Beginner Driving Course",
            message: "Perfect for new drivers! Learn the fundamentals of safe driving with our expert instructors.",
            interestCategories: [_interestCategories[0]],
            createdAt: "2024-02-05T12:15:00Z",
            updatedAt: "2024-02-10T13:45:00Z",
            status: "pending",
            totalRecipients: 900,
            deliveredMessages: 875
        },
        {
            externalId: "camp-010",
            title: "Commercial Vehicle Support",
            message: "Specialized roadside assistance and maintenance services for commercial vehicles.",
            interestCategories: [_interestCategories[1], _interestCategories[3]],
            createdAt: "2024-02-08T15:20:00Z",
            updatedAt: "2024-02-08T15:20:00Z",
            status: "suspended",
            totalRecipients: "1800",
            deliveredMessages: "0"
        }
    ];

    const {data: interestCategories, isLoading: isLoadingInterestCategories, error} = useFetch(
        `${apiBaseUrl}/v1/interest-categories`, ["interestCategories"]
    )

    useEffect(() => {
        if(error) handleError(error);
    }, [error]);

    if (isLoadingInterestCategories) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <CustomSpinner/>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex overflow-hidden space-x-2">
            <div className="flex flex-col flex-1">
                <CampaignsTable campaigns={mockData} meta={[]} />
            </div>
            <div className="w-[30%] max-w-[400px] px-4 border-l">
                <p className="text-lg font-semibold">Create New Campaign</p>
                <CreateCampaignForm interestCategories={interestCategories?.data ?? []} />
            </div>
        </div>
    )
}