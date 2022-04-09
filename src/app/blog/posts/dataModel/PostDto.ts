import {UserDto} from "../../../common/user/dataModel/UserDto";

export interface PostDto {
    id?: number;
    title?: string;
    subTitle?: string;
    imageUrl?:string;
    content?: string;
    author?: UserDto
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface PostsListPageable {
    items: PostDto[],
    meta: Meta;
    links: Links;
}
