// To parse this data:
//
//   import { Convert, StrapiProduct } from "./file";
//
//   const strapiProduct = Convert.toStrapiProduct(json);

export type StrapiProduct = {
    data: Datum[];
    meta: Meta;
}

export type Datum = {
    id:         number;
    attributes: Attributes;
}

export type Attributes = {
    name:            string;
    description:     string;
    price:           number;
    rating:          number | null;
    createdAt:       Date;
    updatedAt:       Date;
    publishedAt:     Date;
    categories:      null;
    tags:            string;
    variations:      null;
    original_id:     string;
    original_source: OriginalSource;
    deleted_at:      null;
    thumbnail:       string;
    uuid:            null;
}

export enum OriginalSource {
    MakeupProductJSON = "makeupProductJson",
}

export type Meta = {
    pagination: Pagination;
}

export type Pagination = {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStrapiProduct(json: string): StrapiProduct {
        return JSON.parse(json);
    }

    public static strapiProductToJson(value: StrapiProduct): string {
        return JSON.stringify(value);
    }
}
