import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const hosting_image_key = import.meta.env.VITE_IMAME_HOSTING_KEY;
const hosting_image_api = `https://api.imgbb.com/1/upload?key=${hosting_image_key}`


const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        // upload image in imgbb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(hosting_image_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // time to send the item to the database
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: res.data.data.display_url,
                category: data.category

            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item Updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // reset();
            }
        }
        console.log(res.data.data);

    }


    return (
        <div>
            <SectionTitle subHeading="" heading="Update An Item"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input defaultValue={name}  {...register('name', { required: true })}
                            type="text" placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-x-4">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipe Name*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input defaultValue={price}  {...register('price', { required: true })}
                                type="text" placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </div>
                    <div className="form-control w-full my-4">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">Update Item <FaUtensils className="ml-3"></FaUtensils></button>
                </form>

            </div>
        </div>
    );
};

export default UpdateItem;