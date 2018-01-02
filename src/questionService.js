import axios from 'axios';

//https://opentdb.com/

const getQuestion = () => {
    return axios.get('https://opentdb.com/api.php?amount=1&difficulty=easy').then(response => {
        return Promise.resolve(response.data.results[0]);
    });
}

export {
    getQuestion
}
