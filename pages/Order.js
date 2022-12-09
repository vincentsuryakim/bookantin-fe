import Layout from "../components/Layout";
import FoodCard from "../components/Card/Food";
import { useState,useEffect } from "react";
import axios from "axios"
import { API_URL } from "../constants/api";
import Popup from 'reactjs-popup';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const GetCart = () => {
    const url = `${API_URL}/api/menu/`
    const urlCart = `${API_URL}/api/cart/add`
	const [list, setList] = useState([]) 
    const [loading, setLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

	useEffect(() => {
        const token = localStorage.getItem("token");
        var cartId = localStorage.getItem("cartId")
        if(cartId == null){
            axios.get(urlCart,
                {
                headers: {
                  Authorization: `Token ${token}`,
                },
              })
            .then((res)=>{
                localStorage.setItem("cartId",res.data.id)
                console.log(cartId)})
        }
		axios.get(url,
            {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
		.then(res => {
			console.log(res.data)
			setList(res.data)
            })  
		
	}, []);
    
    const onSubmit = async (data) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        data.cart = localStorage.getItem("cartId")
        console.log(data.cart)
        console.log(data.quantity)
        console.log(data.menu)
        data.cartId = parseInt(data.cart)
        data.menuId = parseInt(data.menu)
        data.quantity = parseInt(data.quantity)
        var cek
        
        if(data.quantity <= 0){
          toast.error("input harus berupa bilangan bulat positif", {
            duration: 4000,
            position: "top-center",
            })
            setLoading(false);
            return
        }
        await axios.post(`${API_URL}/api/cart-content/get_by_MenuId_CartId/`,data,{
            headers: {
              Authorization: `Token ${token}`,
            }}).then((data)=>{
                cek = true
            } ).catch((e)=>{
                cek = false
            })
        if(!cek){
            axios
            .post(`${API_URL}/api/cart-content/`,data,{
                headers: {
                Authorization: `Token ${token}`,
                }})
            .then(() => {
                toast.success("Add successful", {
                duration: 4000,
                position: "top-center",
                })
            })
            .catch((err) =>
                toast.error(err, {
                duration: 4000,
                position: "top-center",
                })
            )
            .finally(() => {
                setLoading(false);
            });
        }
        else{
            axios.post(`${API_URL}/api/cart-content/add_quantity_by_cartId_menuId/`,data,{
                headers: {
                Authorization: `Token ${token}`,
                }})
                .then(() => {
                    toast.success("Add successful", {
                    duration: 4000,
                    position: "top-center",
                    })
                })
                .catch((err) =>
                    toast.error(err, {
                    duration: 4000,
                    position: "top-center",
                    })
                )
                .finally(() => {
                    setLoading(false);
                });
        }
      };
	

      
	const cards = list.map((item,idx) => {
		return(
            <div>
				<FoodCard key = {idx}
					name={item.name}
					price={item.price}
				/>
                <Popup trigger = {<button>Pesan</button>}
                 position = "right center"
                 contentStyle={{background:'white' ,margin:'auto',padding: '5 px'}} 
                 overlayStyle={{background : 'white'}}
                 closeOnDocumentClick>
                 <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-4 w-full px-4"
          >
            <p className="font-semibold text-2xl text-center mb-4">
              Menu : {item.name}
            </p>
            <p className="font-semibold text-2xl text-center mb-4">
              Harga : {item.price}
            </p>
            <div className="flex flex-col max-w-full w-[400px]">
              <label for="quantity" className="mb-1">
                Quantity <span className="text-red-600">*</span>
              </label>
              <input
                type = 'number'
                id="quantity"
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col max-w-full w-[400px]">
              <input type = 'hidden'
                id="menu" value = {item.id} 
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Menu"
                {...register("menu", { required: true })}
              />
            </div>
            <button
              className={`bg-green-500 ${
                !loading && "hover:bg-green-700"
              } font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add"}
            </button>
          </form>
          </Popup>
                </div>
		)
	})

	return(		
		<div style={{ margin: '1rem'}}>
			<p>List Makanan</p>
			<div className="flex justify-center flex-wrap gap-6 px-4">
				{cards}
			</div>
		</div>
	)
}

const PaymentPage = () => {
    
  return (
    <Layout>
      <p>Detail</p>
      <GetCart/>
    </Layout>
  );
};

export default PaymentPage;
