import { sort } from 'csv-sorter';
import { log } from '../helper/logger';
import { close, openSync, writeSync } from 'fs';

const logger = log.getChildLogger({ name: 'CsvHelper' });

export class CsvHelper {
  public static async sortCSV(fileName: string, destFile: string, sortColumn: number, reverse = false, sortWithHeader = false) {
    logger.info(`Sorting the CSV file: ${fileName}`);
    this.writeToFile(destFile, '');
    logger.debug(`[Before sorting] Heap used: ${process.memoryUsage().heapUsed}, Heap Total: ${process.memoryUsage().heapTotal}`);
    const config = {
      src: fileName,
      dest: destFile,
      sortColumn: sortColumn, //number of column to sort
      reverse: reverse, //sort in reverse order
      sortWithHeader: sortWithHeader, //sort including first header line
    };

    await sort(config, (result, err) => {
      if (err) {
        throw err;
      }
    });
    logger.debug(`[After sorting] Heap used: ${process.memoryUsage().heapUsed}, Heap Total: ${process.memoryUsage().heapTotal}`);
  }

  private static writeToFile(fileName: string, contents: string) {
    logger.debug(`Writing contents to the file`);
    let writeFile;
    try {
      writeFile = openSync(fileName, 'w');
      writeSync(writeFile, contents);
      close(writeFile);
    } catch (err) {
      logger.error(err);
    }
  }
}
