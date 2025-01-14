const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .option('-i, --input <path>', 'Path to the input JSON file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display result in the console')
  .parse(process.argv);

const options = program.opts();

// Check if the input file is provided
if (!options.input) {
  //throw Error('Please, specify input file');
  console.error('Please, specify input file');
  process.exit(1);
}

// Check if the input file exists
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

try {
  // Read the input file
  const inputFilePath = path.resolve(options.input);
  const data = fs.readFileSync(inputFilePath, 'utf-8');
  const parsedData = JSON.parse(data);

  // Find the maximum exchange rate
  const rates = parsedData.map((item) => item.rate);
  const maxRate = Math.max(...rates);
  const result = `Максимальний курс: ${maxRate}`;

  // Display result in the console if --display is set
  if (options.display) {
    console.log(result);
  }

  // Write result to the output file if --output is set
  if (options.output) {
    const outputFilePath = path.resolve(options.output);
    fs.writeFileSync(outputFilePath, result, 'utf-8');
    //console.log(`Result written to ${outputFilePath}`);
  }

  // Exit without output if no optional parameters are provided
  if (!options.display && !options.output) {
    process.exit(0);
  }
} catch (err) {
  console.error('Error processing the input file:', err.message);
  process.exit(1);
}
