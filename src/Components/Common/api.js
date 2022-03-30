import axios from 'axios'

export const uploadFile = async (base64) => {
    const response = await axios({
        url: 'https://api-twon.herokuapp.com/files/v2',
        method: 'POST',
        data: {
            file: base64
        }
    })
    return response.data;
}   