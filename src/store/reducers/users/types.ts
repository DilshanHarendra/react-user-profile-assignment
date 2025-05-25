export type SpouseI = {
    salutation: string;
    firstName: string;
    lastName: string;
}


export interface UserType {
    id: string;
    userId:string;
    password?:string;
    salutation?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    address?: string;
    country?: string;
    postalCode?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    status?: 'Single'| 'Married'
    spouse?:SpouseI,
    hobbies?:string[],
    sports?:string[],
    genres?:string[],
    movies?:string[],
}

export interface UserSliceI {
    user: UserType | null;
    isAuthenticated: boolean;
}
