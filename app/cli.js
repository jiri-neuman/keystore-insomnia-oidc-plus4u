const currentDir = process.cwd();
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const AddTask = require("./tasks/add");
const RmTask = require("./tasks/rm");
const LsTask = require("./tasks/ls");

const sections = [
  {
    header: "oidc-plus4u-vault",
    content: "Utility tool for maintaining AES-265 encrypted file with accessCodes to oidc.plus4u.net."
  },
  {
    header: "Synopsis",
    content: [
      "oidc-plus4u-vault <command> <command parameters>"
    ]
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'add', summary: 'Stores user credentials to the vault.' },
      { name: 'ls', summary: 'List users in the vault.' },
      { name: 'rm', summary: 'Removes user credentials from the vault.' }
    ]
  }
];

async function execute() {

  const mainDefinitions = [
    {name: 'command', defaultOption: true}
  ];

  const mainOptions = commandLineArgs(mainDefinitions, {stopAtFirstUnknown: true});
  const argv = mainOptions._unknown || [];
  let task;
  let opts = {currentDir};
  if (mainOptions.command === "add") {
    task = new AddTask(opts);
  } else if (mainOptions.command === "rm") {
    task = new RmTask(opts);
  } else if (mainOptions.command === "ls") {
    task = new LsTask(opts);
  }

  if (!task) {
    console.error("Unknown command");
    const usage = commandLineUsage(sections);
    console.log(usage);
    return;
  }

  await task.execute(argv);
}

module.exports = execute;