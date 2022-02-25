import dedent from './utils/dedent';

export interface ObjectSchema {
  [library: string]: string[];
}

type ImportMap = { import: string[]; from: string };

function getAvailableComponents(imports: ImportMap[]) {
  return imports.map((res) => res.import).flat();
}

function renderImports(imports: ImportMap[]) {
  return imports
    .map(
      (res) =>
        `import { ${res.import.join(', ')} } from ${JSON.stringify(res.from)};`,
    )
    .join('\n');
}

function renderTypes(imports: ImportMap[]): string {
  const availableComponents = getAvailableComponents(imports);

  return availableComponents
    .map(
      (res) =>
        `export type ${res}$Props = React.ComponentProps<typeof ${res}>;\nexport { ${res} };`,
    )
    .join('\n');
}

function renderInterface(imports: ImportMap[]): string {
  return '';
}

function renderComponentExport(imports: ImportMap[]): string {
  const availableComponents = getAvailableComponents(imports);

  // language=TypeScript
  return dedent(`
    export default [
      ${availableComponents.map(
        (res) => ` { type: ${JSON.stringify(res)}, component: ${res}  } `,
      )}
    ]
  `);
}

export function interfaceGenerator(input: ObjectSchema) {
  const imports: ImportMap[] = [];

  Object.entries(input).forEach(([key, value]) => {
    imports.push({
      from: key,
      import: value,
    });
  });

  return dedent(
    `/* eslint-disable */
  import * as React from "react";
  ${renderImports(imports)}
  
  ${renderTypes(imports)}
  
  ${renderInterface(imports)}
  
  ${renderComponentExport(imports)}
  `
      .replace(/(^[ \t]*\n)/gm, '')
      .trim(),
  );
}
