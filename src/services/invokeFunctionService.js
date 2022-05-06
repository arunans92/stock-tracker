import axios from 'axios'
export async function invokeHelloFunction() {

    try {
        const res = await axios.get("/.netlify/functions/hello");
        console.log(res);
    }
    catch (inError) {
        console.log(inError);
    }
}

export async function getDataFromRapidAPI() {

    try {
        const options = {
            method: 'GET',
            url: 'https://yahoofinance-stocks1.p.rapidapi.com/stock-prices',
            params: {
                EndDateInclusive: '2020-04-01',
                StartDateInclusive: '2020-01-01',
                Symbol: 'MSFT',
                OrderBy: 'Ascending'
            },
            headers: {
                'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com',
                'X-RapidAPI-Key': 'd34dc8b7e3msh8b556c365c2e971p14a8b0jsnf88536e94ae6'
            }
        };

        await axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    catch (inError) {
        console.log(inError);
    }
}