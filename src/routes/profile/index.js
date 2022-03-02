import { h } from 'preact';
import { useState } from "preact/hooks";
let sampleResults = require("../profile/results.json");
// Note: `user` comes from the URL, courtesy of our router
const SearchHolidays = () => {
    const [returnData, setReturnData] = useState(null);
    const [isFutureDate, setIsFutureDate] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isFilteredByPrice, setIsFilteredByPrice] = useState(false);

    const [isFilteredByStarRating, setIsFilteredByStarRating] = useState(false);
    const [isFilteredByFacilities, setIsFilteredByFacilities] = useState(false);
    let [sortedArray, setSortedArray] = useState(null);
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
            if (data && data.length !== 0) {
                setReturnData(data);
            }

            }
    }
    
    function filterResults(event) {
        setIsFiltered(true);
        let hotels = [];
        let content = [];
        let facilities = [];
        for (let i = 0; i < returnData.holidays.length; i++) {
            hotels.push(returnData.holidays[i].hotel);
            
        }
        for (let i = 0; i < hotels.length; i++) {
            content.push(hotels[i].content);
            facilities.push(hotels[i].content.hotelFacilities);
        }
        console.log("hotels", hotels);
        console.log("content", content);
        console.log("facilities", facilities);
        if (event.target.value === "price") {
            console.log("isFilteredByPrice", isFilteredByPrice)
            setIsFilteredByPrice(true);
            setIsFilteredByStarRating(false);
            setIsFilteredByFacilities(false);
            console.log("paddy", event.target.value, isFilteredByPrice);
            sortedArray = returnData.holidays;
            sortedArray?.sort((a, b) => (a.pricePerPerson > b.pricePerPerson ? -1 : 1))

        } if (event.target.value === "star-rating") {
            setIsFilteredByPrice(false);
            setIsFilteredByStarRating(true);
            setIsFilteredByFacilities(false);
            sortedArray = content;
            sortedArray?.sort((a, b) => (a.starRating > b.starRating ? -1 : 1))

        } if (event.target.value === "facilities") {
            setIsFilteredByPrice(false);
            setIsFilteredByStarRating(false);
            setIsFilteredByFacilities(true);
            sortedArray = content;
            sortedArray.hotelFacilities?.sort((a, b) => (a.length > b.length ? -1 : 1))
        }

            setSortedArray(sortedArray);

    };
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
                {returnData &&
                    <>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button class="btn btn-primary me-md-2" value="price" onClick={filterResults} type="button">Filter By Price PP</button>
                            <button class="btn btn-success me-md-2" value="facilities" onClick={filterResults} type="button">Filter By Hotel Facilities</button>
                            <button class="btn btn-info me-md-2" value="star-rating" type="button" onClick={filterResults}>Filter By Star Rating</button>

                        </div></>}
            </div>
            {returnData && !isFiltered && <div class="row">
                <div class="col-8 justify-content-center">
                    {returnData.holidays.map((currentHol, index) => (
                        <>
                            {currentHol.hotel && currentHol.hotel.name &&<h2 class="title">Name: {currentHol.hotel.name}</h2>}
                            {currentHol.totalPrice && <h4 class="total-price">Total Price: {currentHol.totalPrice}</h4>}
                            {currentHol.hotel && currentHol.hotel.content 
                            && currentHol.hotel.content.hotelDescription && <p>Description: {currentHol.hotel.content.hotelDescription}</p>}
                            <hr style="border-top: dotted 1px;" />
                        </>))}
                </div>
            </div>}
            {console.log("sortedArray",sortedArray )}
            {sortedArray && sortedArray.length !==0 && sortedArray.forEach(element => {
                console.log("element", element.hotel);
            })}

            {sortedArray && sortedArray.length !== 0 && isFilteredByPrice && <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {sortedArray.map((currentEl, index) => (
                        <>
                            {currentEl.hote && currentEl.hote.name && <h4>Name: {currentEl.hotel.name}</h4>}
                            {currentEl.pricePerPerson && <h4 class="total-price">Price Per Person: {currentEl.pricePerPerson}</h4>}
                            <hr style="border-top: dotted 1px;" />
                        </>))}
                </div>
            </div>}
            {sortedArray && sortedArray.length !==0 && isFilteredByStarRating && <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {sortedArray.map((currentHol, index) => (
                        <>
                            {currentHol.name && <h2 class="title">Name: {currentHol.name}</h2>}
                            { currentHol.starRating && <h4 class="total-price">Rating: {currentHol.starRating}</h4>}
                            <hr style="border-top: dotted 1px;" />
                        </>))}
                </div>
            </div>}
            {sortedArray && sortedArray.length !==0 && isFilteredByFacilities && <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {sortedArray.map((currentHol, index) => (
                        <>
                            {currentHol.name && <h2 class="title">Name: {currentHol.name}</h2>}
                            {currentHol.hotelFacilities && <h4 class="total-price">Facilities: {currentHol.hotelFacilities}</h4>}
                            <hr style="border-top: dotted 1px;" />
                        </>))}
                </div>
            </div>}
         </div>
        

            
                

	);
};
export default SearchHolidays;
