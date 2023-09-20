import { readFile, readdir, writeFile } from "fs";

export class FileSystem
{
    static getData(file){
        return new Promise((resolve, reject) => {
            readFile(file, (error, data) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(data.toString())
                }
            });
        });
    }
    
   static getDirectoryData(targetFolder){
        return new Promise((resolve, reject) => {
                readdir(targetFolder, (error, files) => {
                if(error){
                    reject(error);
                }
                else{
                    resolve(files);
                }
            });
        })
    }

    static makeFile(fileDestination, data){
        return new Promise((resolve, reject) => {
            writeFile(fileDestination, JSON.stringify(data), error => {
                if(error){
                    reject(error);
                }
                else{
                    resolve();
                }
            });
        })

    }
}
