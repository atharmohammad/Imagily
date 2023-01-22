const yargs = require('yargs')
const add = require('./modules/add')
const { walk } = require('./modules/saveImage')
const init = require('./modules/version.js');
const { commit } = require('./modules/commit');
var exec = require('child_process').exec;

yargs.usage('\nUsage: $0 [cmd] <args>').alias('h', 'help')

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

const argv = new Promise((resolve) =>
  resolve(
    yargs
      .command(
        'add',
        'Add current directory files to stage',
        () => {},
        async function (argv) {
          console.log('add')
          const files = await walk('./modules/Images/') // hardcoded path
          // console.log(files)
          await add(files,`../.imagily/add/`)
        }
      ).command('init','initializes a repository',()=>{},async function(argv){
        await init('../.imagily');
      }).command('commit','commit the staged changes',()=>{},async function(argv) {
        await commit(true);
      }).command('diff','shows difference between current image and last commited image versions',()=>{},async function(argv){
        let { stdout } = await sh('start npm run develop && start firefox index.html'); // works in windows
        console.log(stdout)
      })
      .parse()
  )
).then((r, e) => {
  console.log(r, e)
})

console.log(yargs.argv)
