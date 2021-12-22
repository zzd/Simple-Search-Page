import axios from 'axios';

const request = {
    async post(url) {
        // console.log(data);
        return await axios
            .post(url);
    },

    async get(url) {
        return await axios
            .get(url);
    }

}

export default request