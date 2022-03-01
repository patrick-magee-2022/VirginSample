import { h } from 'preact';
import { useState } from "preact/hooks";
import style from './style.css';
import { Container, Row, Col } from 'react-bootstrap';
let sampleRequest = require("../profile/results.json");
// Note: `user` comes from the URL, courtesy of our router
const SearchHolidays = () => {
    const [returnData, setReturnData] = useState(null);
    const [isFutureDate, setIsFutureDate] = useState(true);
    const cities = ["New York", "Orlando", "Barbados", "Toronto"];
    const currentDateTime = new Date();
    function checkDateField() {
        let dateValue = document.getElementById('inputDate');
        let checkDateValue = new Date(dateValue.value);
        console.log("checkDateValue", checkDateValue)
        if (checkDateValue < currentDateTime) {
            setIsFutureDate(false);
            console.log("wrong date", isFutureDate);

        }
    }
    async function getHolidays(event) {
        event.preventDefault();
        let locationValue = event.target[0].value.toLowerCase();
        let dateValue = document.getElementById("inputDate").value;
        let checkDateValue = new Date(dateValue);
        console.log("paddy", checkDateValue.toLocaleDateString('en-GB').replace(/\//g, "-"), dateValue);
        if (isFutureDate) {
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

            const response  = await fetch('https://www.virginholidays.co.uk/cjs-search-api/search', requestOptions);
            const data = await response.json();
            console.log("response", data);
            if (data && data !== "") {
                setReturnData(data);
                setIsLoading(!isLoading);
                console.log("isLoading", isLoading);
            }

            }
    }
	return (
        <div class="container">
            <div class="row">
                <form onSubmit={getHolidays}>
                        <div class="form-group col-12">
                            <div class="col-4">
                            <label for="inputCity">City</label>
                            <select class="form-select form-select-lg mb-3" aria-label="Select A City">
                                {cities.map((currentCity) => (
                                    <option value={currentCity}>{currentCity}</option>
                                ))}
                            </select>
                            </div>
                            <div class="col-4">
                            <label for="inputDate" class="form-label">Date:</label>
                            <input type="date" required
                                class={!isFutureDate ? "form-control is-invalid" : "form-control"} id="inputDate"
                                name="trip-start" placeholder="dd-mm-yyyy"
                                value=""
                                onBlur={checkDateField}
                                min={currentDateTime} />
                                {!isFutureDate && <span class="invalid-feedback">Date is Incorrect</span>}

                        </div>
                        <div class="col-4 mt-2">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        </div>
                </form>
            </div>
            {returnData && <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {returnData.holidays.map((currentHol) => (
                        <>
                            <h2 class="title">{currentHol.hotel.name}</h2>
                            <p class="text">{currentHol.hotel.content.atAGlance}</p>
                        </>))}
                </div>
            </div>}
         </div>
        

            
                

	);
};
export default SearchHolidays;
