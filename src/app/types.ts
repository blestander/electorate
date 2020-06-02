export interface VotingMethod {
    name: string,
    alternateNames?: string[]
    voterSummary: string,
    resolveSummary: string,
    strengths: VotingMethodAttribute[],
    weaknesses: VotingMethodAttribute[],
}

export interface VotingMethodAttribute {
    name: string,
    description: string
}
