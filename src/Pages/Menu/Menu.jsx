import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const dessert = menu.filter(item => item.category === 'dessert');

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu"></Cover>
            <div className='mt-12'>
                <SectionTitle subHeading="Don't miss" heading="TODAY'S OFFER"></SectionTitle>
                <MenuCategory items={offered}></MenuCategory>
            </div>
            {/* this is for dessert items */}
            <MenuCategory items={dessert} title="dessert" coverImg={dessertImg}></MenuCategory>
            {/* for pizza */}
            <MenuCategory items={pizza} title="pizza" coverImg={pizzaImg} ></MenuCategory>
            {/* for soup */}
            <MenuCategory items={soup} title="soup" coverImg={soupImg}></MenuCategory>
            {/* for salad */}
            <MenuCategory items={salad} title="salad" coverImg={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;