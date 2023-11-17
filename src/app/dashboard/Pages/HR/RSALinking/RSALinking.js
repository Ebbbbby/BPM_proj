import React, { useEffect, useState } from 'react'
import Linking from "../RSALinking/Styles/Linking.module.css"
import { Search } from './RSASearch/Search'
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { GetRSA } from '../../../../../utils/redux/HR/HRSlice';
import { useSelector,useDispatch } from 'react-redux';
const RSALinking = ({children}) => {
  const [param, setParam] = useState('')
  const [userName, setUserName] = useState('')
  const {get_Rsa}= useSelector((state)=> state?.hr)
  console.log(get_Rsa)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(GetRSA({
    param:param,
    userName:userName
  }
  ))
  },[])
  return (
    <>
  <div className={Linking.Hero_Img}>
  <Search text={(param) => setParam(param)} onClick={()=> navigate(`../${URL.Search_Request}`)}/>
  </div>
  </>
  )
}

export default RSALinking
