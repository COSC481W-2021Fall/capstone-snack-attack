import AddProduct from '../components/AddProduct';
import React, { useState } from "react";

import { useSelector } from "react-redux";


export default function ProductAddScreen() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

   
    if (!userInfo || !(userInfo.userrole === 'admin')){
        return (
            <div>
                Please sign in as a store manager first.
            </div>
        )
    } else {

        const adminId = userInfo._id;
        console.log(adminId)

        return (
            <div>
                < AddProduct adminId={adminId} />
            </div>
        )

    }
}