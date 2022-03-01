import { h } from 'preact';
import { useState } from "preact/hooks";
import style from './style.css';
let sampleRequest = require("../profile/results.json");
// Note: `user` comes from the URL, courtesy of our router
const SearchHolidays = () => {
    let responseObj;
    const cities = ["New York", "Orlando", "Barbados", "Toronto"];
    const currentDateTime = new Date();
    const [isFutureDate, setIsFutureDate] = useState(false);
    function getHolidays(event) {
        event.preventDefault();
        let locationValue = event.target[0].value.toLowerCase();
        let dateValue = document.getElementById("start").value;
        let checkDateValue = new Date(dateValue);
        console.log("paddy", checkDateValue.toLocaleDateString('en-GB').replace(/\//g, "-"), dateValue);
        if (!isFutureDate) {
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
            fetch('https://www.virginholidays.co.uk/cjs-search-api/search', requestOptions)
                .then(response => 
                    console.log("paddy2", response));
        }
    }
    function checkDateField() {
        let dateValue = document.getElementById('start');
        let checkDateValue = new Date(dateValue.value);
        console.log("checkDateValue", checkDateValue)
        if (checkDateValue < currentDateTime) {
            console.log("wrong date");
            setIsFutureDate(!isFutureDate);
        }
    }
	return (
        <>
            <form onSubmit={getHolidays}>
                <label>Choose a Destination from the List:
                    <input list="destinations" name="myDestination"></input>
                    <datalist id="destinations">
                    {cities.map((currentCity) => (
                        <option value={currentCity}></option>
                    ))}
                    </datalist>
                    <label for="start">Select date:</label>
                    <input type="date" id="start" name="trip-start" placeholder="dd-mm-yyyy"
                        value=""
                        onBlur={checkDateField}
                        min={currentDateTime}></input>
                </label>
                <input type="submit" />
                {isFutureDate && <span class="error">Date is Incorrect</span>}
            </form>
            <div class={style.container}>
                <ul class={style.list}>
                    {sampleRequest.holidays.map((currentHol) => (
                        <>
                        <li class={}>Hotel Name: {currentHol.hotel.name}
                        <span class={}>Hotel Price: {currentHol.totalPrice}</span>
                        <span class={}>Deposit Required: {currentHol.deposit}</span>
                        </li>

                        </>

                    ))}
                </ul>
            </div>
        </>


	);
}

export default SearchHolidays;
