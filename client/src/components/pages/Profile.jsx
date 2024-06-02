import { useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../lib/auth'
import ShakeBrief from '../subcomponents/ShakeBrief'

export default function Profile() {
  const { shakeId } = useParams()

  function request(fromData){
    return axios.get(`/api/profile/`, fromData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }

  return (
    <h1>Profile</h1>
  )
}