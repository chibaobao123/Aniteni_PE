
import Axios from 'axios';

export const createBills = (data,token) => {
    let promise = Axios({
        method: 'POST',
        url: 'http://localhost:4000/createBills',
        data: data,
        headers: {
            'authorizationtoken': token
        }
      })

    return promise
}
