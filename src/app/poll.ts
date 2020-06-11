export interface Poll {
    id?: string,
    name?: string,
    description?: string,
    options?: string[],
    method?: string,
    own?: boolean,
    finished?: boolean,
    results?: any,
    startTime?: string,
    endTime?: string,
    voteTime?: string,
    has_voted?: boolean,
    can_vote?: boolean,
    choice?: any
}
