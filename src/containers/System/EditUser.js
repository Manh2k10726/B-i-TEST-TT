import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {  Radio ,DatePicker,Space ,Button} from 'antd';
import moment from 'moment';
import './EditUser.scss'
import{getAllStudent,getStudentById,editUser,delUser} from '../../services/userService';

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editUser:{},
            arrUser:[],
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
    async componentDidMount() {
        let idInput = this.props.match.params.id
        await this.getStudentByIds({id:idInput});
    }
//    let idInput = this.props.match.params
    getStudentByIds = async()=>{
        let idInput = this.props.match.params.id
        console.log('check id :',typeof idInput)
        let x = Number(idInput)
        console.log('check id x :', x)
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
        let arrInput =['username','firstname','lastname',"email",'phone','birthday','gender'];
        for(let i = 0 ; i< arrInput.length;i++){
            console.log(this.state[arrInput[i]],[arrInput[i]])
            if(!this.state[arrInput[i]]){
                isValid =false;
                alert('Bạn chưa nhập: '+ arrInput[i] + ' ,vui lòng điền đầy đủ thông tin !!!');
                break;
            }
        }
        return isValid;
    }
    handleDelUser= async (id)=>{
        try {
            let res = await delUser({id:this.arrUser.id}) ;
            console.log(res)
            if (res) {
                await this.getAllStudent();
            } else {
                alert('lỗi chỉnh sửa!')
            }
        } catch (e) {
            console.log(e)
        }
        this.props.history.push(`/system/user-manage`)
    }
    handleDoEditUser= async (id)=>{
        try {
            let res =await editUser({id:this.arrUser.id});
            console.log(res)
            if (res) {
                await this.getAllStudent();
            } else {
                alert('lỗi chỉnh sửa!')
            }
        } catch (e) {
            console.log(e) 
        }
    this.props.history.push(`/system/user-manage`)
        
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
    //   this.props.history.push(`/detail-doctor/${doctor.id}`)
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
                                    <input className='form-control' type='username' value={this.state.editUser.username}
                                onChange={(event)=> {this.handleOnChangeInput(event,'username')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Họ (*):</label>
                                    <input className='form-control' type='text'value={this.state.editUser.firstname}
                                onChange={(event)=> {this.handleOnChangeInput(event,'firstname')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Tên (*) :</label>
                                    <input className='form-control' type='text' value={this.state.editUser.lastname}
                                onChange={(event)=> {this.handleOnChangeInput(event,'lastname')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Email (*):</label>
                                    <input className='form-control' type='email'value={this.state.editUser.email}
                                onChange={(event)=> {this.handleOnChangeInput(event,'email')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Điện Thoại(*) :</label>
                                    <input className='form-control' type='text'value={this.state.editUser.phone}
                                onChange={(event)=> {this.handleOnChangeInput(event,'phone')}}/>
                            </div>
                            <div className='col-12'>
                                <label>Địa chỉ :</label>
                                    <input className='form-control' type='text'value={this.state.editUser.address}
                                onChange={(event)=> {this.handleOnChangeInput(event,'address')}}/>
                            </div>
                            <div className='col-12 '>
                                <label>Ngày Sinh :</label>
                                    <div >
                                        <Space   direction="vertical">
                                            <DatePicker  format="DD/MM/YYYY"  onChange={this.onChange} />
                                        </Space>
                                    </div>
                            </div>
                            <div className='col-12'>
                                <label>Giới Tính(*) :</label>
                                    <div >
                                        <Radio.Group onChange={this.handleOptionChange} value={this.state.gender}>
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
                                    <Button onClick={()=>this.handleDoEditUser()}>Cập Nhật</Button>
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
