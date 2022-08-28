export class MapHelper {
  public static ConvertMapToString<X>(map: Map<X, X[]>): string {
    let keys = map.keys();
    let result = '';
    for (let key of keys) {
      let values = map.get(key) || '';
      result += `${key},${values.toString()}\n`;
    }
    return result;
  }
}
