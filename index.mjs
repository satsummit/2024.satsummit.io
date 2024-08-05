import fs from 'fs-extra';

async function main() {
  const template = await fs.readFile('template.html', 'utf8');
  const urls = await fs.readFile('urls.txt', 'utf8');

  const urlsArray = urls.split('\n');
  
  for (const url of urlsArray) {
    const [from, to] = url.split(/ +/);
    const dir = `dist/${from}`;
    await fs.ensureDirSync(dir);
    const content = template.replaceAll('{{ URL }}', to);
    await fs.writeFile(`${dir}/index.html`, content);
  }
}

main();