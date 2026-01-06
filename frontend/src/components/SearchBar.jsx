import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Logic chuyển hướng: Khi ấn kính lúp (showSearch = true) mà chưa ở trang collection
    useEffect(() => {
        if (showSearch && !location.pathname.includes('collection')) {
            navigate('/collection');
        }
    }, [showSearch]);

    // 2. Logic Reset: Khi người dùng rời khỏi trang Collection, tự động tắt thanh search
    // Để lần sau bấm kính lúp, nó sẽ hoạt động lại bình thường
    useEffect(() => {
        if (!location.pathname.includes('collection') && showSearch) {
            setShowSearch(false);
        }
    }, [location]);

    // 3. Logic Render: Chỉ hiển thị khi (showSearch là True) VÀ (Đang ở trang Collection)
    // Cách viết này giúp bạn không cần dùng biến state 'visible' nữa -> Tránh lỗi không tắt được
    return (showSearch && location.pathname.includes('collection')) ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm'
                    type="text"
                    placeholder='Search'
                />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img
                onClick={() => setShowSearch(false)}
                className='inline w-3 cursor-pointer'
                src={assets.cross_icon}
                alt=""
            />
        </div>
    ) : null
}

export default SearchBar