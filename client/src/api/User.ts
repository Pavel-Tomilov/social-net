import {z} from 'zod'


export const UserShema =z.object({
    id: z.string(),
    username: z.string(),
})

export type User = z.infer<typeof UserShema>;