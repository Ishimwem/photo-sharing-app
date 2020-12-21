export interface Photo {
    _id?: string;
    length?: Number;
    chunkSize?: Number;
    uploadDate?: string;
    filename: string;
    md5?: string;
    contentType?: string
    //maybe add image property?
    //remember to remove unnecessary properties
}