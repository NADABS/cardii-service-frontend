export type ParsedError = {
    status: number;
    message: string;
    errors: Record<string, string[]>;
};