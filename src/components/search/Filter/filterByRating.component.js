import { h, Fragment } from 'preact';
// Note: `user` comes from the URL, courtesy of our router
const FilterByRating = ({ data }) => {

    return (
        <div class="row">
            <div class="col-8 justify-content-center p-2">
                {data.map((currentHol, curIndex1) => (
                    <Fragment key={curIndex1}>
                        {currentHol.name && <h2 class="title">Name: {currentHol.name}</h2>}
                        {currentHol.starRating && <h4 class="total-price">Rating: {currentHol.starRating}</h4>}
                        <hr />
                    </Fragment>))}
            </div>
        </div>
    );
};
export default FilterByRating;
