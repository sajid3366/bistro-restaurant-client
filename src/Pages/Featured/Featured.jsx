import SectionTitle from '../../components/SectionTitle/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='py-[100px] bg-fixed mb-12 featured text-white'>
            <SectionTitle
                subHeading='Check it out'
                heading='From featured'
            ></SectionTitle>
            <div className='flex justify-center   items-center gap-5 pt-8 max-w-5xl mx-auto'>
                <div >
                    <img className='w-[650px]' src={featuredImg} alt="" />
                </div>
                <div className='max-w-xl'>
                    <p>March 20, 2023</p>
                    <p className='uppercase'>Where can i get some</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, quidem vel? Nostrum eius ipsum sed voluptatem, recusandae dolorum explicabo voluptatibus!</p>
                    <button className="btn btn-outline border-0 border-b-2">Order Now</button>

                </div>
            </div>
        </div>
    );
};

export default Featured;