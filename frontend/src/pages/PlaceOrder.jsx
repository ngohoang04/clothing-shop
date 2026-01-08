import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal' // Giả sử bạn đã có component này
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod'); // State lưu phương thức thanh toán (cod, stripe, razorpay)
    const { navigate } = useContext(ShopContext);

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* ------------- LEFT SIDE: DELIVERY INFORMATION ------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                {/* Họ và Tên */}
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="First name" />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="Last name" />
                </div>

                {/* Email */}
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder="Email address" />

                {/* Địa chỉ */}
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="Street" />

                {/* Thành phố và Bang/Tỉnh */}
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="City" />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="State" />
                </div>

                {/* Zipcode và Quốc gia */}
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder="Zipcode" />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder="Country" />
                </div>

                {/* Số điện thoại */}
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder="Phone" />
            </div>

            {/* ------------- RIGHT SIDE: CART TOTAL & PAYMENT ------------- */}
            <div className='mt-8'>

                {/* Cart Total Component */}
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                {/* Payment Method Selection */}
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Payment Options Container */}
                    <div className='flex gap-3 flex-col lg:flex-row'>

                        {/* Stripe Option */}
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
                        </div>

                        {/* Razorpay Option */}
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        {/* Cash on Delivery Option */}
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder