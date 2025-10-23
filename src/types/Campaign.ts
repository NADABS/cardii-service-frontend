import InterestCategory from "@/src/types/InterestCategory";

export type Campaign = {
    externalId: string;
    title: string;
    name: string;
    message: string;
    interestCategories: InterestCategory[];
    createdAt: string;
    updatedAt: string;
    status: string;
    totalRecipients: number | string;
    deliveredMessages: number | string;
}