
const FoodCard = ({item}) => {
    const {name, price, image, recipe} = item;

    return (
        <div className=" rounded-md bg-gray-200 ">
            <figure><img src={image} className="w-full rounded-md" alt="order" /></figure>
            <p className="absolute bg-black -mt-[200px] ml-[250px] text-white px-4 py-2 ">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;