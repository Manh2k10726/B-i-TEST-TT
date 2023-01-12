import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import 'antd/dist/antd.css';
// import { Button, Space,Table } from 'antd';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import './UserManage.scss'
import ModalUser from './ModalUser'
import {emitter} from '../../utils/emitter'
import{getAllStudent ,createNewUserService} from '../../services/userService';
import {message,Table} from 'antd'


// const columns = [
//     {
//       title: 'Tên Đăng Nhập',
//       dataIndex: 'username',
//       key: 'name',
//     },
//     {
//       title: 'Họ',
//       dataIndex: 'firstname',
//       key: 'firstname',
//     },
//     {
//       title: 'Tên',
//       dataIndex: 'lastname',
//       key: 'lastname',
//     },
//     {
//         title: 'email',
//         dataIndex: 'email',
//         key: 'email',
//       },
//       {
//         title: 'Điện Thoại',
//         dataIndex: 'phone',
//         key: 'phone',
//       },
//       {
//         title: 'Địa chỉ',
//         dataIndex: 'address',
//         key: 'address',
//       },
//       {
//         title: 'Ngày Sinh',
//         dataIndex: 'birthday',
//         key: 'birthday',
//       },
//       {
//         title: 'Giới Tính',
//         dataIndex: 'gender',
//         key: 'gender',
//       },
//       {
//         title: '',
//         dataIndex: 'id',
//         key: 'id',
//         render: (text, item) => {
//             return <div className='flex'>
//                 <button className='mx-4 text-green-500 hover:text-green-900' title='Sửa' 
//                 // onClick={() => {
//                 //             this.props.history.push(`/detail-user/${item.id}`)
//                 // }}
//                 onClick={()=>this.handleEdit(item)}
//                 >
//                     <i className="fas fa-pencil-alt" style={{ fontSize: 10 }}></i>
//                 </button>
//             </div>
//             },
//     },
//   ];
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUser:[],
            isOpenModalUser:false,
            activePage: '',
            itemsCountPerPage: '',
            totalItemsCount: '',
            idUserEdit:'',
            page:'0',
            // page:'',
            size:'',
        }
    }

    async componentDidMount() {
        await this.getAllStudent();
        console.log('check data')
    }
    async componentDidUpdate(prevProps, prevState){

        if(prevState.arrUser !== this.state.arrUser){
            this.setState({
                arrUser:this.state.arrUser
            })
        }
        if(prevState.page !== this.state.page){
            this.setState({
                page:this.state.page,
            },async()=> {
                await this.getAllStudent(this.state.page)
                console.log('check page 1 :',this.state.page)
             })
        }
    }
    getAllStudent = async()=>{
        let response =await getAllStudent({pageNumber:this.state.page});
        if(response ){
            this.setState({
                arrUser: response.data,
                itemsCountPerPage: response.total_count,
                totalItemsCount: response.total_page,
            })
        }
    } 
    // getAllStudent = async(pages)=>{
    //     // let pages=0;
    //     let response =await getAllStudent({pages:this.state.page});
    //     if(response ){
    //         this.setState({
    //             arrUser: response.data,
    //             itemsCountPerPage: response.total_count,
    //             totalItemsCount: response.total_page,
    //         })
    //     }
    // }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    } 
    handleAddNewUser=()=>{
        this.setState({
            isOpenModalUser:true,
        })
    }
    handleCreateUser=async(data)=>{
        try {
            let response =await createNewUserService(data);
            if (response ) {
                await message.error("thêm mới thất bại")
            } else {
                await this.getAllStudent();
                this.setState({
                    isOpenModalUser:false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            
        } catch (e) {
            console.log(e)
        }
        console.log('check data ',data)
    }
    handlePageChange = async (pageNumbers)=> {
            this.setState({
                    activePage: pageNumbers,
                    page:pageNumbers -1,
            },async()=> {
                await this.getAllStudent({pageNumber:this.state.page})
                this.props.history.replace(`/system/user-manages/${this.state.page + 1}`)
                console.log('check page active:',this.state.page)
             });
            // await this.getAllStudent(this.state.page)
            // this.props.history.replace(`/system/user-manage/${this.state.page + 1}`)
            // console.log('check page active:',this.state.page)
    }
    // handlePageChange = async (event)=> {
    //     let pageNumbers = event.target.value;
    //     this.setState({
    //             activePage: pageNumbers,
    //             page:pageNumbers -1,
    //     },async()=> {
    //         await this.getAllStudent({pageNumber:pageNumbers -1})
    //         this.props.history.replace(`/system/user-manage/${this.state.page + 1}`)
    //         console.log('check page active:',this.state.page)
    //      });
// }
    handleEdit =(item)=>{
        this.props.history.push(`/detail-user/${item.id}`)
        this.setState({
            idUserEdit:item.id
        })
    }
   

    render() {
        let arrUser = this.state.arrUser;
        console.log('check user:',arrUser)
        return (
            <div className="user-container">
                <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.handleCreateUser}
                />
                
                <div className='title text-center'>
                        Hệ Thống Quản lý Sinh Viên
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={()=> this.handleAddNewUser()}
                    ><i className="fas fa-plus-circle"></i> Tạo Mới</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Tên Đăng Nhập</th>
                            <th>Họ Tên</th>
                            <th>Email</th>
                            <th>Điện Thoại</th>
                        </tr>
                        {
                                arrUser && arrUser.map((item,index) => {
                                    return(
                                        <tr key={index} onClick={()=>this.handleEdit(item)}>
                                            <td> {item.username}</td>
                                            <td> <span>{item.firstname}</span> <span>{item.lastname}</span> </td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                        </tr>
                                    )
                                })
                            }
                            
                            </tbody>
                    </table>
                </div>

                <div style={{float: 'right'}}>
                    <Pagination
                        activePage={this.state.activePage}
                        // itemsCountPerPage={this.state.totalItemsCount}
                        totalItemsCount={this.state.totalItemsCount}
                        itemsCountPerPage={1}
                        pageRangeDisplayed={5}
                        // onChange={(event)=>this.handlePageChange(event)}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
                {/* <Table
                    dataSource={arrUser}
                    columns={columns}
                    key=''
                    pagination={{
                        defaultCurrent: 1,
                        total: `${this.state.totalItemsCount}`,
                        onChange: (page, pageSize) => {
                            this.GetListStudentAction(page - 1)
                            this.props.history.replace(`/system/user-manage/${page}`)
                        }
                    }} />; */}
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
