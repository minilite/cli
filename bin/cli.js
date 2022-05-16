#! /usr/bin/env node

const program = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const ora = require('ora')
const spawn = require('cross-spawn');

const log = console.log

program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 在create.js红执行创建任务
    require('../lib/create.js')(name, options)
  })

program
  .command('config [value]')
  .description('check and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>', 'set config value')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    log(value, options)
  })


// 配置 ui 命令
program
  .command('ui')
  .description('start and open vue-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')


program.on('--help', () => {

  log('\r\n' + figlet.textSync(require('../package.json').name.toUpperCase(), {
    font: '3-D',
    horizontalLayout: 'full',
    verticalLayout: 'default',
    width: 200,
    whitespaceBreak: true
  }))
  // 新增说明信息
  log(`\r\nRun ${chalk.cyan(`minilite <command> --help`)} for detailed usage of given command\r\n`)
})

program.parse(process.argv)