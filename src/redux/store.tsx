import { configureStore } from '@reduxjs/toolkit'
import onewayReducer from '../redux/slices/onewaySlice'
export default configureStore({
  reducer: {
    onewayData:onewayReducer
  }
})