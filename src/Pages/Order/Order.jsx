import Cover from "../Shared/Cover/Cover";
import orderImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const dessert = menu.filter(item => item.category === 'dessert');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div >
            <Helmet>
                <title>Bistro | Ordre Food</title>
            </Helmet>
            <Cover img={orderImg} title="Orderd Food"></Cover>
            <Tabs className="my-12 text-center px-[100px]" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>

                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>

                </TabPanel>
                <TabPanel>
                <OrderTab items={dessert}></OrderTab>

                </TabPanel>
                <TabPanel>
                <OrderTab items={drinks}></OrderTab>

                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;