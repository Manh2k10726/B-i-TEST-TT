import axios from "../axios";

const  getAllStudent =(data) =>{
    return axios.get(`http://prod.example.fafu.com.vn/employee?page=${data.pageNumber}&size=4`)
}
const  editUser =(id) =>{
    return axios.put(`http://prod.example.fafu.com.vn/employee/${id}`)
}
const  delUser =(id) =>{
    return axios.delete(`http://prod.example.fafu.com.vn/employee/${id}`)
}
const  getStudentById  =(id) =>{
    return axios.get(`http://prod.example.fafu.com.vn/employee/${id}`)
}
// const  getStudentById  =() =>{
//     return axios.get(`http://prod.example.fafu.com.vn/employee/504`)
// }
const createNewUserService =(data)=>{
    return axios.post(`http://prod.example.fafu.com.vn/employee`,data)
}
export{
    getAllStudent,createNewUserService,getStudentById
    ,editUser,delUser
}