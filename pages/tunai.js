import React, {useEffect, useState} from "react";
import { useQRCode } from "next-qrcode";
import {API_URL} from "../constants/api";
import {useRouter} from "next/router";
import axios from "axios";

function Tunai() {
  const { Canvas } = useQRCode();
  const url = `${API_URL}/api/cart-content/`;
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    var cartId = localStorage.getItem("cartId");
    if (cartId != null) {
      setId(cartId)
      console.log(id)
    }
    else {
      return (
        <p className="font-semibold text-2xl text-center mb-4">
          Anda Belum memesan makanan
        </p>
      );
    }
  }, [id, url]);

  return (
    <Canvas
      text={"http://localhost:3000" + "/cart/" + id}
      options={{
        level: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF",
        },
      }}
    />
  );
}
export default Tunai;
