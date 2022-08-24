import axios from "axios";
import { getItem } from "../Utils/storage";

const token = getItem('token')

export default axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})