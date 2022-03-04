import { h, Fragment } from 'preact';
import { useState } from "preact/hooks";
import  FilterByPrice  from './Filter/filterByPrice.component';
import  FilterByRating  from './Filter/filterByRating.component';
import  FilterByFacilities  from './Filter/filterByFacilities.component';
import getHolidaysService from './getHolidaysService';
const Search = () => {
    const [returnData, setReturnData] = useState(null);
    const [isFutureDate, setIsFutureDate] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isFilteredByPrice, setIsFilteredByPrice] = useState(false);
    const [isFilteredByStarRating, setIsFilteredByStarRating] = useState(false);
    const [isFilteredByFacilities, setIsFilteredByFacilities] = useState(false);
    const [isError, setIsError] = useState(false);
    let [sortedArray, setSortedArray] = useState(null);
    const cities = ["New York", "Orlando", "Barbados", "Toronto"];
    const currentDateTime = new Date();
    function checkDateField() {
        let dateValue = document.getElementById('inputDate');
        let checkDateValue = new Date(dateValue.value);
        if (checkDateValue < currentDateTime) {
            setIsFutureDate(false);
        }
    }
    function getHolidays(event) {
        setReturnData(null)
        setIsError(false);
        setIsFiltered(false);
        setIsFilteredByPrice(false);
        setIsFilteredByStarRating(false);
        setIsFilteredByFacilities(false);
        event.preventDefault();
        let locationValue = event.target[0].value.toLowerCase();
        let dateValue = document.getElementById("inputDate").value;
        let checkDateValue = new Date(dateValue);
        if (isFutureDate) {
            getHolidaysService(locationValue, checkDateValue)
                .then((data) => {
                    console.log(data);
                    setReturnData(data);
    
                })
                .catch((err)  => {
                    console.log("error", err);
                    setIsError(true);
                })
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
        if (event.target.value === "price") {
            setIsFilteredByPrice(true);
            setIsFilteredByStarRating(false);
            setIsFilteredByFacilities(false);
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

    }
	return (
        <div class="container">
            <div class="row">
                <form onSubmit={getHolidays}>
                        <div class="form-group col-12">
                            <div class="col-4">
                            <label for="inputCity" id="input-city">City</label>
                            <select class="form-select form-select-lg mb-3" id="select-city" aria-label="Select A City">
                                {cities.map((currentCity, curInd) => (
                                    <option key={curInd} value={currentCity}>{currentCity}</option>
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
                            <button type="submit" id="submit-selection" class="btn btn-primary">Submit</button>
                        </div>
                        </div>
                </form>
                {isError &&
                    <div class="col-6 p-2">
                        <div class="alert alert-danger justify-content-center">Error Retrieving Data</div>
                    </div>
                }
                {returnData && returnData.length !==0 &&
                    <>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button class="btn btn-primary me-md-2" value="price" onClick={filterResults} type="button">Filter By Price PP</button>
                            <button class="btn btn-success me-md-2" value="facilities" onClick={filterResults} type="button">Filter By Hotel Facilities</button>
                            <button class="btn btn-info me-md-2" value="star-rating" type="button" onClick={filterResults}>Filter By Star Rating</button>

                        </div></>}
            </div>
            {returnData && returnData.length !==0 && !isFiltered && <div class="row">
                <div class="col-8 justify-content-center">
                    {returnData.holidays.map((currentHol, index) => (
                        <Fragment key={index}>
                            {currentHol.hotel && currentHol.hotel.name &&<h2 class="title">Name: {currentHol.hotel.name}</h2>}
                            {currentHol.totalPrice && <h4 class="total-price">Total Price: {currentHol.totalPrice}</h4>}
                            {currentHol.hotel && currentHol.hotel.content 
                            && currentHol.hotel.content.hotelDescription && <p>Description: {currentHol.hotel.content.hotelDescription}</p>}
                            <hr />
                        </Fragment>))}
                </div>
            </div>}
            {sortedArray && sortedArray.length !==0  && isFilteredByPrice && <FilterByPrice data={sortedArray} />}

			{sortedArray && sortedArray.length !==0 && isFilteredByStarRating && <FilterByRating data={sortedArray} />}

			{ sortedArray && sortedArray.length !==0 && isFilteredByFacilities && <FilterByFacilities data={sortedArray} />}
         </div>
        

            
                

	);
};
export default Search;
