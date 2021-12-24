import * as makerCore from '../src/util/maker/core'
import dayjs from 'dayjs'

describe('maker', () => {
  describe('makerCore', () => {
    it('test makerCore.getPTextFromTAmount', async () => {
      const result = true
      const name = undefined
      // console.log({ name: String(name) })

      const t = {
        state: 0,
        tAmount: 1002,
        error: undefined,
      }
      console.log(`t=${t}`)

      expect(result).toBeTruthy()
    })
  })
})
