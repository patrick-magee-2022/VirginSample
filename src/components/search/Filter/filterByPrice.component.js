import { h, Fragment } from 'preact';
// Note: `user` comes from the URL, courtesy of our router
const FilterByPrice = ({ data }) => {

    return (
        <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {data.map((currentEl, curIndex) => (
                        <Fragment key={curIndex}>
                            {currentEl.hotel && currentEl.hotel.name && <h4>Name: {currentEl.hotel.name}</h4>}
                            {currentEl.pricePerPerson && <h4 class="total-price">Price Per Person: {currentEl.pricePerPerson}</h4>}
                            <hr  />
                        </Fragment>))}
                </div>
            </div>
    );
};
export default FilterByPrice;
