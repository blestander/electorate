export interface VotingMethod {
    name: string,
    alternateNames?: string[]
    voterSummary: string,
    resolveSummary: string,
    strengths: string[],
    weaknesses: string[],
}
