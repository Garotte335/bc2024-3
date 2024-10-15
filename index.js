const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .version('1.0.0')
  .description('Process input file and output results')
  .requiredOption('-i, --input <path>', 'Path to the input JSON file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display result in the console')
  .parse(process.argv);

const options = program.opts();

// Check if the input file is provided
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Check if the input file exists
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Read the input file
const inputFilePath = path.resolve(options.input);

try {
  const data = fs.readFileSync(inputFilePath, 'utf-8');
  const parsedData = JSON.parse(data);

  // Result to be output
  const result = JSON.stringify(parsedData, null, 2);

  // If --display option is set, print to console
  if (options.display) {
    console.log(result);
  }

  // If --output option is set, write to file
  if (options.output) {
    const outputFilePath = path.resolve(options.output);
    fs.writeFileSync(outputFilePath, result, 'utf-8');
    console.log(`Result written to ${outputFilePath}`);
  }

  // If no optional parameters were set, do nothing
  if (!options.display && !options.output) {
    process.exit(0);
  }
} catch (err) {
  console.error('Error processing the input file:', err.message);
  process.exit(1);
}
