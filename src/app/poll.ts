export interface Poll {
    id?: string,
    name?: string,
    description?: string,
    options?: string[],
    method?: string,
    own?: boolean,
    finished?: boolean,
    results?: any,
    start_time?: string | Date,
    finish_time?: string | Date,
    vote_time?: string | Date,
    has_voted?: boolean,
    can_vote?: boolean,
    choice?: any,
    webhook?: string,
    guild_proof?: string,
}
