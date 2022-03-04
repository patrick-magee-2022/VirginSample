function getHolidaysService(locationValue,checkDateValue) {
    const URL = 'https://www.virginholidays.co.uk/cjs-search-api/search';
    const postObject = {
        bookingType: "hotel",
        location: `${locationValue}`,
        departureDate: `${checkDateValue.toLocaleDateString('en-GB').replace(/\//g, "-")}`,
        duration: "7",
        partyCompositions: [
            {
                adults: 2,
                childAges: [],
                infants: 0
            }
        ]
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow_origin': '*' },
        body: JSON.stringify(postObject)
    };

        
           return fetch(URL, requestOptions)
            .then((response) => {
                console.log("paddy", response.data);
                return response.json();
            })
            .then((currData) => {
                return currData;
                //console.log("paddy2" , currData)
            })
            .catch((err) => {
                console.log(err);
            })
}
export default getHolidaysService;