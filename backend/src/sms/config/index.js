const RECEIVER_PHONE = 'xxx,xxx'

module.exports = {
  schinese: {
    options: {
      Endpoint: 'https://utf8api.smschinese.cn/',
      Uid: process.env['SMS_UID'],
      Key: process.env['SMS_KEY'],
      smsMob: process.env['SMS_NUMBERS']
    },
  },
}
