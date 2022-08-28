import { MapHelper } from '../../src/helper/map-helper';

describe('Class MapHelper tests', () => {
  describe('ConvertMapToString() tests', () => {
    function invokeMethod(map: Map<any, any>) {
      return MapHelper.ConvertMapToString(map);
    }

    it('should return a string when calling with object', () => {
      let map = new Map<string, string[]>();
      map.set('flower', ['rose', 'jasmine', 'lotus']);
      map.set('animal', ['lion', 'tiger', 'dog']);
      let result = invokeMethod(map);
      expect(result).toEqual('flower,rose,jasmine,lotus\n' + 'animal,lion,tiger,dog\n');
    });

    it('should return a string when calling with empty map', () => {
      let map = new Map<string, string[]>();
      let result = invokeMethod(map);
      expect(result).toEqual('');
    });
  });
});
