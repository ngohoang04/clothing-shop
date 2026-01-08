import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets'; // Giả sử bạn có icon bin/trash ở đây
import CartTotal from '../components/CartTotal';

const Cart = () => {

    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

    // 1. Sửa lỗi khởi tạo state
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        // Đổi tên biến items -> productId và item -> size để dễ hiểu hơn
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                if (cartItems[productId][size] > 0) {
                    tempData.push({
                        _id: productId, // 2. Sửa lỗi logic: ID phải lấy từ vòng lặp cha
                        size: size,
                        quantity: cartItems[productId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <div className="text-2xl mb-3">
                <Title text1={'Your'} text2={'Cart'} />
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);

                    // Kiểm tra nếu không tìm thấy sản phẩm thì không render
                    if (!productData) return null;

                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>

                            {/* Cột 1: Thông tin sản phẩm */}
                            <div className='flex items-start gap-6'>
                                <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cột 2: Số lượng (Input) */}
                            <input
                                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />

                            {/* Cột 3: Nút xóa (Icon thùng rác) */}
                            <img
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                className='w-4 mr-4 sm:w-5 cursor-pointer'
                                src={assets.bin_icon}
                                alt="Delete"
                            />
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart