import { readFileSync, rmSync, writeFileSync } from 'fs';

export class FileUtil {
  public static writeToFile(fileName: string, contents: string) {
    writeFileSync(fileName, contents);
  }

  public static readFromFile(fileName: string): string {
    return readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
  }

  public static deleteFile(fileName: string) {
    rmSync('path/to/file', {
      force: true,
    });
  }
}
