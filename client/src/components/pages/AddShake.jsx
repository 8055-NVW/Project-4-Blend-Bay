import axios from 'axios'
import { getToken } from '../../lib/auth.js'

import ShakeForm from '../subcomponents/ShakeForm.jsx'

export default function AddShake() {
    
    function request(formData){
        return axios.post(`/api/shakes/`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
    }})}

    return (
        <ShakeForm title='Add' request={request}/>
    )
}