export interface FileData {
    id : number ;
    fileName : string ;
    fileType : string;
    filePath : string;
    filSize : number;
}

export interface ContentRecords {
    id : number;
    title : string; 
    description : string ;
    editor : string ;
    youtube_url : string
    docs : FileData[];
}   