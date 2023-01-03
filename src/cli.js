#!/usr/bin/env node
const yargs = require("yargs");

yargs.usage("\nUsage: $0 [cmd] <args>").alias("h", "help");

yargs
  .command(
    "status",
    "show list of changed files",
    function (argv) {
      console.log("files");
    }
  )
  .example("node $0 add --name='John Doe' --phone='0123456789'");

yargs
  .command(
    "commit",
    "commit",
    {
      message: {
        type: "string",
        demandOption: true,
        describe: "Contact name",
        alias:"m"
      }
    },
    function (argv) {
        console.log(argv.message)
    }
  )
  .example("node $0 commit --message 'athar'");

  console.log(yargs.argv);

// ( () => {
//   console.log(argv.status);
// })();