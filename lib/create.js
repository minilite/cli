const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const log = console.log


const Generator = require('./Generator')

/**
 * 执行创建命令
 * @param {*} name 
 * @param {*} options 
 */
module.exports = async function (name, options) {

  // console.log(name, options)

  // 当前命令行选择的目录
  const cwd = process.cwd()

  // 需要创建的目标地址
  const targetDir = path.join(cwd, name)

  // 判断是否已经存在
  if (fs.existsSync(targetDir)) {

    // 是否为强制创建
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // TODO: 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists, Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return
      } else if (action === 'overwrite') {
        // log('\r\nRemoving...')
        await fs.remove(targetDir)
        // log('Removed.')
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetDir)

  generator.create()
}