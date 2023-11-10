import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import PopularItems from "../PopularItems/PopularItems";
import Testimonials from "../Testimonials/Testimonials";
import Category from "./Category";

const Home = () => {
    return (
        <div>
            <Banner></Banner> 
            <Category></Category>
            <PopularItems></PopularItems>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;