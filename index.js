const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .description('Simple CLI with Commander.js')
  .option('-n, --name <type>', 'Your name')
  .parse(process.argv);

const options = program.opts();

if (options.name) {
  console.log(`Hello, ${options.name}!`);
} else {
  console.log('Hello, world!');
}
