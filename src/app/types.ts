export interface VotingMethod {
    name: string,
    alternateNames?: string[]
    voterSummary: string,
    resolveSummary: string,
    strengths: VotingMethodAttribute[],
    weaknesses: VotingMethodAttribute[],
    implNotes?: string[]
}

export interface VotingMethodAttribute {
    name: string,
    description: string
}
