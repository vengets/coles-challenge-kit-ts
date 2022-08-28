import { appendFileSync, renameSync } from 'fs';
export class FileHelper {
  public static appendStringToFile(fileName: string, contents: string) {
    appendFileSync(fileName, contents);
  }

  public static renameFile(oldFileName: string, newFileName: string) {
    renameSync(oldFileName, newFileName);
  }
}
