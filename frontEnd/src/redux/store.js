import { configureStore } from "@reduxjs/toolkit"; 
import SaveId from "./slice/SaveId";
 
export  const store = configureStore(
{ reducer:{
  cart:SaveId,

}});
 