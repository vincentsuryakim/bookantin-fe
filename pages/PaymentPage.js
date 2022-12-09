import Layout from "../components/Layout";
import FoodCard from "../components/Card/Food";
import { useState,useEffect } from "react";
import axios from "axios"
import redirect from 'nextjs-redirect'
import { API_URL } from "../constants/api";
import Popup from 'reactjs-popup';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const GetCart = () => {
    const url = `${API_URL}/api/cart-content/`
	const router = useRouter();
    const urlPayment = "https://master--courageous-basbousa-3ef9e8.netlify.app/.netlify/functions/token"
	const [list, setList] = useState([])
    const [totalHarga,setTotalHarga] = useState(null)
    const [payment,setPayment] = useState(null)
	const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

	useEffect(() => {
		var cartId = localStorage.getItem("cartId")
		const token = localStorage.getItem("token");
		if(cartId != null){
			axios.get(url+cartId+"/get_by_CartId",{
				headers: {
				  Authorization: `Token ${token}`,
				}})
			.then(res => {
				console.log(res.data)
				var temp = 0
				res.data.map((item)=>{
					temp = temp + item.menu.price * item.quantity
				})
				console.log(temp)
				setTotalHarga(temp)
				setList(res.data)
				})  
				
		}
	}, []);
    
    const redirect2 = async () => {
		await axios.get(urlPayment+'?totalHarga='+totalHarga).then((res2) => {
			console.log(res2.data.url)
        router.push(res2.data.url)})
    }
    const tunai = () => {
      
          router.push("/tunai")
    }
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
    if(data.quantity <= 0){
      toast.error("input harus berupa bilangan bulat positif", {
        duration: 4000,
        position: "top-center",
        })
        setLoading(false);
        return
    }
		await axios.post(`${API_URL}/api/cart-content/delete_by_CartId_MenuId/`,data,{
            headers: {
              Authorization: `Token ${token}`,
            }})
		if(data.quantity > 0){
		await axios
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
		}
		location.reload()
      };

	const cards = list.map((item,idx) => {
		return(
            <div>
				<FoodCard key = {idx}
					name={item.menu.name}
					price={item.menu.price}
				/>
                <p> {item.quantity}</p>
				<Popup trigger = {<button>Edit</button>}
                 position = "right center"
                 contentStyle={{background:'white' ,margin:'auto',padding: '5 px'}} 
                 overlayStyle={{background : 'white'}}
                 closeOnDocumentClick>
                 <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-y-4 w-full px-4"
          >
            <p className="font-semibold text-2xl text-center mb-4">
              Menu : {item.menu.name}
            </p>
            <p className="font-semibold text-2xl text-center mb-4">
              Harga : {item.menu.price}
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
                id="menu" value = {item.menu.id} 
                className="bg-[#efefef] hover:bg-[#eaeaea] font-semibold text-black w-full h-[50px] px-4 rounded-md"
                placeholder="Menu"
                {...register("menu", { required: true })}
              />
              {errors.quantity && (
                <span className="font-semibold text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              className={`bg-green-500 ${
                !loading && "hover:bg-green-700"
              } font-semibold text-white max-w-full w-[400px] h-[50px] rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "edit"}
            </button>
          </form>
          </Popup>
                </div>
		)
	})
  if(list.length==0){
    return(
      <div style={{ margin: '1rem'}}>
			<h4>Anda belum memesan makanan</h4>
		</div>
    ) 
  }
	return(		
		<div style={{ margin: '1rem'}}>
			<p>List Makanan</p>
      <Popup trigger = {<button>Tunai</button>}
                 position = "right center"
                 contentStyle={{background:'white' ,margin:'auto',padding: '5 px'}} 
                 overlayStyle={{background : 'white'}}
                 closeOnDocumentClick>
        <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
          <p className="font-semibold leading-[1.375rem] line-clamp-2">Apakah anda yakin ingin membayar secara non tunai ?</p>
          <button onClick={()=>redirect2()}>bayar</button>    
        </div>
      </Popup>
      <Popup trigger = {<button>Tunai</button>}
                 position = "right center"
                 contentStyle={{background:'white' ,margin:'auto',padding: '5 px'}} 
                 overlayStyle={{background : 'white'}}
                 closeOnDocumentClick>
        <div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
          <p className="font-semibold leading-[1.375rem] line-clamp-2">Apakah anda yakin ingin membayar secara tunai ?</p>
          <button onClick={()=>tunai()}>lanjut</button>    
        </div>
      </Popup>
			<div className="flex justify-center flex-wrap gap-6 px-4">
				{cards}
			</div>
			
		</div>
	)
}

const PaymentPage = () => {
    
  return (
    <Layout>
      <h3>Detail</h3>
      <GetCart/>
    </Layout>
  );
};

export default PaymentPage;
