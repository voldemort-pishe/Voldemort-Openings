export interface JobModel {
    id: number;
    uniqueId: string;
    nameFa: string;
    descriptionFa: string;
    nameEn: string;
    descriptionEn?: any;
    language?: any;
    type: string;
    location: string;
}
