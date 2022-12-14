import axios from 'axios';

export default class GetService {

    static async getInfo(callback, dateCallback) {
        
        const keyAPI = 'YkdcoTOX3Z8lkaQ5hQvXZqsZSH5xdQMBdpp7JRzd'
        
        let date = new Date()
        const yyyy = date.getFullYear()
        let mm = date.getMonth() + 1
        let dd = date.getDate()

        if(dd < 10) dd = "0" + dd
        if(mm < 10) mm = "0" + mm

        date = yyyy + "-" + mm + "-" + dd
        dateCallback(date)

        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${keyAPI}`)
        callback(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${keyAPI}`)

        // сортировка по расстоянию промаха
        let itemsArray = [...response.data.near_earth_objects[date]]
        itemsArray.sort((a, b) => Number(a.close_approach_data[0].miss_distance.kilometers) > Number(b.close_approach_data[0].miss_distance.kilometers) ? 1 : -1);

        return itemsArray
    }
}