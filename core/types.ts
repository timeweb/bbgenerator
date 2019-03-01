export interface Options {
    name: string;
    path: string;
    model?: string|boolean;
    collection?: string|boolean;
    itemView?: string|boolean;
    type?: string;  
}

export interface InputTemplateData {
    path: string;
    name?: string;
}

export interface InputCollectionViewTemplateData extends InputTemplateData {
    childViewName: string;
}

export interface OutputTemplateData {
    path: string;
    name?: string;
    folder?: string;
    type?: string;
}