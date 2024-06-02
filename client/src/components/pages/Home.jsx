import axios from 'axios'
import { getToken } from '../../lib/auth'

// Custom Components
import ShakeBrief from '../subcomponents/ShakeBrief'

export default function Home() {
  function request(formData){
      return axios.get(`/api/shakes/`, formData, {
          headers: {
              Authorization: `Bearer ${getToken()}`
  }})}

  return (
    <ShakeBrief request={request}/>
  )
}