import Layout from "../components/Layout";
import FoodCard from "../components/Card/Food";
import { useState,useEffect } from "react";
import axios from "axios"
import redirect from 'nextjs-redirect'
const GetCart = () => {
    const url = "http://localhost:8000/api/cart-content/10/get_by_CartId"
    const urlPayment = "https://master--courageous-basbousa-3ef9e8.netlify.app/.netlify/functions/token"
	const [list, setList] = useState([])
    const [totalHarga,setTotalHarga] = useState(null)
    const [payment,setPayment] = useState(null)
    
	useEffect(() => {
		axios.get(url)
		.then(res => {
			console.log(res.data)
            var temp = 0
            res.data.map((item)=>{
                temp = temp + item.menu.price * item.quantity
            })
            console.log(urlPayment+"?"+temp)
            axios.get(urlPayment+'?totalHarga='+temp).then((res2) => {
			console.log(res2)
            console.log(res2.data.url)
            setPayment(res2.data.url)
            console.log(temp)
            setTotalHarga(temp)
			setList(res.data)
            })  
		})
	}, []);
    
    const redirect2 = () => {
		console.log(payment)
        redirect(payment)
    }
	// const handleDelete = (id) => {
	// 	axios.delete(url+"/delete/" + id)
	// 	.then(res => {
	// 		console.log(res.data)
	// 		window.location.reload();
	// 	})
	// }

	const cards = list.map((item,idx) => {
		return(
            <div>
				<FoodCard key = {idx}
					name={item.menu.name}
					price={item.menu.price}
				/>
                <p> {item.quantity}</p>
                </div>
		)
	})

	return(		
		<div style={{ margin: '1rem'}}>
			<p>List Makanan</p>
			<a  href={payment}> tes </a>
			<button onClick={()=>redirect2()}>halo</button>
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
