export type User = {
    externalId: string;
    internalId: string;
    name: string;
    email: string;
    status: string;
    invitedAt: string;
    createdAt: string;
    updatedAt: string;
    bearerToken?: string;
}