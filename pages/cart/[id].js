import {useAuthContext} from "../../contexts/AuthContext";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../constants/api";
import Layout from "../../components/Layout";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";

const GetCart = () => {
	const router = useRouter();
	const { id } = router.query;
	const [list, setList] = useState([]);
	const [totalHarga, setTotalHarga] = useState(null);

	const url = `${API_URL}/api/cart-content/`;
	const urlCart = `${API_URL}/api/cart/`;

	useEffect(() => {
		const token = localStorage.getItem("token");
		axios
			.get(url + id + "/get_by_CartId", {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((res) => {
				var temp = 0;
				res.data.map((item) => {
					temp = temp + item.menu.price * item.quantity;
				});
				setTotalHarga(temp);
				setList(res.data);
			});
	})

	const redirect = async () => {
		const token = localStorage.getItem("token");
		await axios.post(urlCart +id + "/accept_payment/",null, {
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then((res) => {
				toast.success(res.data, {
					duration: 4000,
					position: "top-center",
				});
		});
	};

		const cards = list.map((item, idx) => {
			return (
				<div key={idx}>
					<div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
						<p className="font-semibold leading-[1.375rem] line-clamp-2">
							{item.menu.name}
						</p>
						<p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">
							Harga : {item.menu.price}
						</p>
						<p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">
							jumlah : {item.quantity}
						</p>
						<p className="mt-2.5 text-sm font-semibold leading-[1.188rem]">
							Total Harga : {item.quantity * item.menu.price}
						</p>
					</div>
				</div>
			);
		});
		if (list.length === 0) {
			return (
				<p className="font-semibold text-2xl text-center mb-4">
					Anda Belum memesan makanan
				</p>
			);
		}
		return (
			<div style={{ margin: "1rem" }}>
				<div className="flex flex-row justify-center">
					<p>id Pesanan : {localStorage.getItem("cartId") || ""}</p>
				</div>
				<div className="flex flex-row justify-center">
					<p>List Makanan</p>
				</div>
				<div className="flex justify-center flex-wrap gap-6 px-4">{cards}</div>
				<div className="flex flex-row justify-center">
					<p>Total Harga:</p>
				</div>
				<div className="flex flex-row justify-center">
					<p>{totalHarga}</p>
				</div>
				<div className="flex flex-row justify-center">
					<Popup
						trigger={
							<button
								className={`bg-green-500 font-semibold text-white max-w-full w-[400px] h-[50px]`}
							>
								Terima Pembayaran
							</button>
						}
						position="center"
						contentStyle={{
							background: "white",
							margin: "auto",
							padding: "5 px",
						}}
						overlayStyle={{ background: "white", opacity: "30%" }}
						closeOnDocumentClick
					>
						<div className="w-[300px] max-w-full min-h-[110px] p-4 border-[1px] rounded-md border-[#e8e8e8]">
							<p className="font-semibold leading-[1.375rem] line-clamp-2">
								Apakah anda yakin ingin menyelesaikan pembayaran ?
							</p>
							<button
								className={`bg-green-500 font-semibold text-white max-w-full w-[400px] h-[50px]`}
								onClick={() => redirect()}
							>
								bayar
							</button>
						</div>
					</Popup>
			</div>
			</div>
		);
};

const CartPage = () => {
	return (
		<Layout>
			<div className="flex flex-row justify-center">
				<p className="font-semibold text-2xl text-center mb-4">Detail</p>
			</div>
			<GetCart />
		</Layout>
	);
};
export default CartPage;
