export const msgFormat = {
  bold: (str: string) => '**' + str + '**',
  italic: (str: string) => '*' + str + '*',
  code: (str: string) => '```' + str + '```',
  quote: (str: string) => `> ${str}`,
};
