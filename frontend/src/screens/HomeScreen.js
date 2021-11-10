
/* import { useSelector } from "react-redux";

function CheckInfo ({userInfo}){
  if(userInfo){
    return <h1>Got info</h1>
  }

  return <h1>Didn't get info</h1>
} */
import ProductsList from "../components/ProductList";

export default function HomeScreen () {

/*   const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  console.log(userInfo); */
  // console.log(userInfo.username);   
  return (

    <div>
      
      <ProductsList/>
     {/* {< CheckInfo userInfo={userInfo} />}      */}
 
    </div>
  )
}

