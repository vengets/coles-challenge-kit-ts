import { FileUtil } from '../../utils/file-util';
import { CsvHelper } from '../../../src/helper/csv-helper';
import { sort } from 'csv-sorter';

// Testing a library method is not-necessary hence safe to skip.
describe(`CSVHelper tests`, () => {
  describe('sort() library method should sort as expected', () => {
      let testFilePath = '../data/csv-helper.csv';
      let destPath = '../data/sorted.csv';
      let contents = 'id,department,product,customerId\n' +
        '10,Garden,Muffin - Mix - Strawberry Rhubarb,\n' +
        '52,Industrial,Pork - Belly Fresh,554\n' +
        '23,Electronics,Sobe - Orange Carrot,\n' +
        '44,Outdoors,Stock - Fish,\n' +
        '5,Clothing,"Soup - Knorr, Chicken Noodle",171\n';

      let sortedContents = 'id,department,product,customerId\n' +
        '5,Clothing,"Soup - Knorr, Chicken Noodle",171\n' +
        '10,Garden,Muffin - Mix - Strawberry Rhubarb,\n' +
        '23,Electronics,Sobe - Orange Carrot,\n' +
        '44,Outdoors,Stock - Fish,\n' +
        '52,Industrial,Pork - Belly Fresh,554\n';

      beforeEach(() => {
        FileUtil.writeToFile(testFilePath, contents);
        FileUtil.deleteFile(destPath);
      });

      afterAll(() => {
        FileUtil.deleteFile(testFilePath);
      });

      async function invokeMethod() {
        const config = {
          src: testFilePath,
          dest: destPath,
          sortColumn: 1, //number of column to sort
          reverse: false, //sort in reverse order
          sortWithHeader: true, //sort including first header line
        };

        await sort(config, (result, err) => {
          if (err) {
            throw err;
          }
        });
      }

      it('should sort the contents of the csv file', () => {
        let existingContents = FileUtil.readFromFile(destPath);
        expect(existingContents).toEqual(null);

        invokeMethod();

        let updatedContents = FileUtil.readFromFile(testFilePath);
        expect(updatedContents).toEqual(sortedContents);
      });
    });

  xdescribe('sortCSV() should sort the file as expected', () => {
    let testFilePath = '../data/csv-helper.csv';
    let destPath = '../data/sorted.csv';
    let contents = 'id,department,product,customerId\n' +
      '10,Garden,Muffin - Mix - Strawberry Rhubarb,\n' +
      '52,Industrial,Pork - Belly Fresh,554\n' +
      '23,Electronics,Sobe - Orange Carrot,\n' +
      '44,Outdoors,Stock - Fish,\n' +
      '5,Clothing,"Soup - Knorr, Chicken Noodle",171\n';

    let sortedContents = 'id,department,product,customerId\n' +
      '5,Clothing,"Soup - Knorr, Chicken Noodle",171\n' +
      '10,Garden,Muffin - Mix - Strawberry Rhubarb,\n' +
      '23,Electronics,Sobe - Orange Carrot,\n' +
      '44,Outdoors,Stock - Fish,\n' +
      '52,Industrial,Pork - Belly Fresh,554\n';

    beforeEach(() => {
      FileUtil.writeToFile(testFilePath, contents);
      FileUtil.deleteFile(destPath);
    });

    afterAll(() => {
      FileUtil.deleteFile(testFilePath);
    });

    function invokeMethod() {
      CsvHelper.sortCSV(testFilePath, destPath, 1);
    }

    xit('should sort the contents of the csv file', () => {
      let existingContents = FileUtil.readFromFile(destPath);
      expect(existingContents).toEqual(null);

      invokeMethod();

      let updatedContents = FileUtil.readFromFile(testFilePath);
      expect(updatedContents).toEqual(sortedContents);
    });
  });
});
