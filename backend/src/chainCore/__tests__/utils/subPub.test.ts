import PubSub from '../../src/utils/pubsub'
let i = 0
const subInfo = PubSub.subscribe('test', (data: any) => {
    console.log('Receive Sub Result:', data)
  })
  console.log('SubInfo Response：', subInfo)
  
const time = setInterval(() => {
  i++
  PubSub.publish('test', { count: i })
  console.log('publish:', { count: i })
  if (i>=5) {
    PubSub.unSubscribe(subInfo.id)
    clearInterval(time);
  }
}, 1000)

