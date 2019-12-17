'use strict'
//i18n 国际化脚本配置文件
module.exports = {
  projectName: 'test',
  templateName: 'test.template.properties',
  fieldsRepo: '',
  //fieldsRepo: '',
  lang: [{
    value: 'en',
    colName: '英文字段'
  }, {
    value: 'zh-CN',
    colName: '中文字段'
  }, {
    value: 'ja',
    colName: '日文字段'
  }],
  excelPath: 'constant/i18nTemplate/template.xlsx', //字段库文件excel
  i18nObjPath: 'src/i18n/zh-CN/index.js', // 源代码中的中文国际化文件（为了获取全部i18n key 值）
  i18nOutput: 'constant', //根据模板生成的 i18n 源文件存放目录
  templatePath: 'constant/i18nTemplate/', //初始化模板输出目录
  idField: '字段ID',
  email: {
    attachment: {
      filename: 'test.missing_keys.properties',
      path: 'constant/i18nTemplate/missing_keys.properties'
    },
    config: {
      host: 'smtp.mxhichina.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'username@componey.cn', // generated ethereal user
        pass: '123456' // generated ethereal password
      }
    },
    option: {
      from: 'no_reply@componey.cn', // sender address
      to: 'username@componey.com', // list of receivers
      subject: '国际化字段缺失提醒 ✔', // Subject line
      html: `
        <h3> Hi 徐立阳, </h3>
        <p>
        附件中是 test 资源文件build时缺少的字段，请尽快补齐。
        备注：以下是自动生成的资源文件：
        </p>`,
    }
  }
}
