const yargs = require("yargs");
const add = require("./modules/add");
const {walk} = require("./modules/saveImage");

yargs.usage("\nUsage: $0 [cmd] <args>").alias("h", "help");

const argv = yargs
  .command(
    "add",
    "Add current directory files to stage",
    () => {},
    async function (argv) {
      console.log("add");
      const files = await walk('./modules/Images/'); // hardcoded path
      return await add(files);
    }
  ).parse().then(r=>console.log(r))

yargs
  .command(
    "search",
    "Search a contact",
    {
      name: {
        describe: "Contact name",
        type: "string",
        demandOption: true,
      },
    },
    function () {
      console.log("search");
    }
  )
  .example("node $0 search --name='John Doe'");

yargs
  .command(
    "remove",
    "Remove a contact",
    {
      name: {
        describe: "Contact name",
        type: "string",
        demandOption: true,
      },
    },
    function (argv) {
      console.log("remove");
    }
  )
  .example("node $0 remove --name='John Doe'");

yargs
  .command("show", "Display all contacts", function () {
    console.log("show");
  })
  .example("node $0 show");

// console.log(yargs.argv);