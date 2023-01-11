import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DatePicker, Popconfirm, Radio, Space ,Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './EditUser.scss';
import { message } from 'antd';
import{getAllStudent,getStudentById,editUser,delUser} from '../../services/userService';
import _ from 'lodash';
import { toast } from 'react-toastify';


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editUser:{},
            username:'',
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            address:'',
            birthday:'',
            gender:'',
            setValue:'0'
          };
    }
     
    //  formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         username: editUser?.username,
    //         firstname: editUser?.firstname,
    //         lastname: editUser?.lastname,
    //         email: editUser?.email,
    //         phone: editUser?.phone,
    //         address: editUser?.address,
    //         birthday: editUser?.birthday,
    //         gender: editUser?.gender,
    //     },
    //     validationSchema: Yup.object({
    //         username: Yup.string()
    //             .required("Không được trống !"),
    
    //         firstname: Yup.string()
    //             .required("Không được trống !"),
    
    //         lastname: Yup.string()
    //             .required("Không được trống !"),
    
    //         email: Yup.string()
    //             .required("Không được trống !"),
    
    //         phone: Yup.string()
    //             .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    //                 message: "Số điện thoại chưa đúng",
    //                 excludeEmptyString: false,
    //             })
    //             .required("Không được trống !"),
    
    //         birthday: Yup.string()
    //             .required("Không được trống !"),
    
    //         gender: Yup.string()
    //             .required("Không được trống !"),
    
    //     }),
    //     onSubmit: values => {
    //       this.handleDoEditUser(id, values)
    //     }
    // })
    async componentDidMount() {
        let idInput = this.props.match.params.id
        await this.getStudentByIds();
        let user = this.state.editUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                phone:user.phone,
                address:user.address,
                birthday:moment(user.birthday),
                gender:user.gender,
                setValue:user.gender,
            })}
    }

    getStudentByIds = async()=>{
        let idInput = this.props.match.params.id
        console.log('check id :',typeof idInput)

        let res = await getStudentById(idInput);
        console.log("check data1 edit:",res)
        if(res ){
            this.setState({
                editUser: res,
            })
        }
    }
    handleOnChangeInput = (event,id) =>{
        let copyState = {...this.state};
        copyState[id]= event.target.value;
        this.setState({
            ...copyState
        });   
    }
    checkValidateInput =() => {
        let isValid = true;
        let arrInput =['username','firstname','lastname',"email",'phone','gender'];
        for(let i = 0 ; i< arrInput.length;i++){
            console.log(this.state[arrInput[i]],[arrInput[i]])
            if(!this.state[arrInput[i]]){
                isValid =false;
                toast.error('Bạn chưa nhập: '+ arrInput[i] + ' ,vui lòng điền đầy đủ thông tin !!!');
                break;
            }
        }
        return isValid;
    }
    handleDelUser= async ()=>{
        let idInput = this.props.match.params.id
        try {
            let res = await delUser(idInput) ;
            console.log(res)
            if (res.status===200) {
               await message.error('xóa sinh viên thất bại !')
            } else {
               await message.success("xóa thành công!")
                this.props.history.push(`/system/user-manage`)
            }
        } catch (e) {
            console.log(e)
        }

    }
    handleDoEditUser= async (data)=>{
        let idInput = this.props.match.params.id
        try {
            let res = await editUser(idInput,data);
            console.log('data edit',res)
            if (res.status === 200) {
                await message.error('cập nhật sinh viên thất bại !')
            } else {
                await message.success("Cập nhật thành công!")
                this.props.history.push(`/system/user-manage`)

            }
        } catch (e) {
            console.log(e) 
        }
        
        
    }
    handleSaveUser = async () =>{
        let isValid = this.checkValidateInput();
        if(isValid == true){
        //     let day =  new Date(this.state.birthday).getTime();
        //     let day = moment(this.state.birthday);
        //         this.setState({
        //     birthday:day
        // })
            //call api
           await this.handleDoEditUser(this.state);   
        }
    }
    onChange = (date) => {
        console.log(date);
        this.setState({
            birthday:date
        })
      };
      handleOptionChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            setValue:e.target.value,
            gender:e.target.value,
        })
      };

    handleClose =()=>{
        this.props.history.push(`/system/user-manage`)
    }
    
    render() {
        let {editUser} = this.state
        console.log('check data Sinh viên: ',editUser)
        return (
            <>
            <div className='SV-container'>
                <div className='SV-body'>
                    <div className='container'>   
                        <div className='row'>
                            <div className='col-12 text-header' my-8>Chỉnh sửa thông tin</div>
                            <div className='col-12'>
                                <label>Tên Đăng Nhập (*) :</label>
                                    <input className='form-control' type='username'
                                     value={this.state.username}
                                onChange={(event)=> {this.handleOnChangeInput(event,'username')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Họ (*):</label>
                                    <input className='form-control' type='text'
                                    value={this.state.firstname}
                                onChange={(event)=> {this.handleOnChangeInput(event,'firstname')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Tên (*) :</label>
                                    <input className='form-control' type='text'
                                    value={this.state.lastname}
                                onChange={(event)=> {this.handleOnChangeInput(event,'lastname')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Email (*):</label>
                                    <input className='form-control' type='email'
                                    value={this.state.email}
                                onChange={(event)=> {this.handleOnChangeInput(event,'email')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Điện Thoại(*) :</label>
                                    <input className='form-control' type='text'
                                    value={this.state.phone}
                                onChange={(event)=> {this.handleOnChangeInput(event,'phone')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Địa chỉ :</label>
                                    <input className='form-control' type='text'
                                    value={this.state.address}
                                onChange={(event)=> {this.handleOnChangeInput(event,'address')}}/>
                            </div>
                            <div className='col-12 '>
                                <label>Ngày Sinh :</label>
                                    <div >
                                        <Space   direction="vertical">
                                            <DatePicker  
                                            format='DD-MM-YYYY'
                                            value={this.state.birthday}
                                            // value={moment(this.state.birthday)} 
                                             onChange={this.onChange} />
                                        </Space>
                                    </div>
                            </div>
                            <div className='col-12'>
                                <label>Giới Tính(*) :</label>
                                    <div >
                                        <Radio.Group 
                                        // defaultValue={this.state.editUser.gender} 
                                        onChange={this.handleOptionChange} 
                                        value={this.state.gender}
                                        >
                                            <Radio value={'0'}>nam</Radio>
                                            <Radio value={'1'}>nữ</Radio>
                                        </Radio.Group>
                                    </div>
                            </div>
                            <div className='custom-btn' style={{float:'right'}}  >
                                <div className='col-3'>
                                    <Button onClick={()=>this.handleClose()}>Đóng</Button>
                                 </div>
                                <div className='col-3'>
                                    <Button onClick={()=>this.handleDelUser()}>Xóa</Button>
                                </div>
                                <div className='col-3'>
                                    <Button onClick={()=>this.handleSaveUser()}>Cập Nhật</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                   
                </div>
            </div>
                
            </>
            
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser));
