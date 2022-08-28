export class MapHelper {
  public static ConvertMapToString<X>(map: Map<X, X[]>) {
    let keys = map.keys();
    let result = '';
    for (let key of keys) {
      let values = map.get(key);
      result += `${key},${values.toString()}\n`;
    }
  }
}
