
import axios from 'axios'
export default {
    getTokenInfos: async function (httpEndPoint) {
        const lpTokenInfoUrl = `${httpEndPoint}/exchange/tokens`
        const response = await axios.get(lpTokenInfoUrl)
        if (response.status === 200) {
            return response.data
        } else {
            return null
        }
    }
}
