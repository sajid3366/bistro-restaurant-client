
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center w-4/12 mx-auto mb-8">
            <p className="text-orange-500  mb-2">--- {subHeading} ---</p>
            <h2 className="text-3xl uppercase border-y-4 py-3">{heading}</h2>
        </div>
    );
};

export default SectionTitle;