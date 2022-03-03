import { h, Fragment } from 'preact';
// Note: `user` comes from the URL, courtesy of our router
const FilterByFacilities = ({ data }) => {

    return (
        <div class="row">
                <div class="col-8 justify-content-center p-2">
                    {data.map((currentHol, curIndex2) => (
                        <Fragment key={curIndex2}>
                            {currentHol.name && <h2 class="title">Name: {currentHol.name}</h2>}
                            {currentHol.hotelFacilities && <h4 class="total-price">Facilities: {currentHol.hotelFacilities}</h4>}
                            <hr />
                        </Fragment>))}
                </div>
            </div>
    );
};
export default FilterByFacilities;
