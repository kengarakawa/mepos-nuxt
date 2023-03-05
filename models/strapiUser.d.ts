// To parse this data:
//
//   import { Convert, StrapiUser } from "./file";
//
//   const strapiUser = Convert.toStrapiUser(json);

export type StrapiUser = {
    id:        number;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStrapiUser(json: string): StrapiUser {
        return JSON.parse(json);
    }

    public static strapiUserToJson(value: StrapiUser): string {
        return JSON.stringify(value);
    }
}
