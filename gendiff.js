const program = require('commander');
program.description(' Compares two configuration files and shows a difference.')
program.version('0.0.1')
program.option('-f, --format [type]', 'output format')
program.argument('<filepath1> <filepath2>')
program.parse(process.argv);