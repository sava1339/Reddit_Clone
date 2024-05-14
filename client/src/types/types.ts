export interface Post {
    id:number,
    communityId:number,
    userId:number,
    dataLink:string,
    title:string,
    description:string,
    createdAt:string,
    karma:number,
}
export interface Community {
    id:number,
    userId: number,
    title:string,
    userCommunity:boolean,
    createdAt: string,
}