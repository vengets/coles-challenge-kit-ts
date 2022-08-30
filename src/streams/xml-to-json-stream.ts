import { XMLParser } from 'fast-xml-parser';

export class XmlToJsonStream {
  public transform(chunk: string) {
    const parser = new XMLParser();
    return parser.parse(chunk);
  }
}
