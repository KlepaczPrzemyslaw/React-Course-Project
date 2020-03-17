import React from 'react';

const Order = (props) => {
        const ingredientsList = Object.entries(props.ingredients).map(x =>
            (+x[1] > 0) ?
                (<p className="u-capital-letters" key={x[0]}>
                    &rarr; {x[0]} [<strong>{x[1]}</strong>]
                </p>) :
                null
        );

        return (
            <div className="order">
                <p>Ingredients: </p>
                {ingredientsList}
                <p>Price:&nbsp;
                    <strong>
                        {Number.parseFloat(props.price).toFixed(2)} $
                    </strong>
                </p>
            </div>
        );
    }
;

export default Order;
