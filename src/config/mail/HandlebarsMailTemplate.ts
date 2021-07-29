import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  filePath: string;
  variables: ITemplateVariable;
}

export class HandlebarsMailTemplate {
  public async parse({
    filePath,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(filePath, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
