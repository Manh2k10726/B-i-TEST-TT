import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {  Radio ,DatePicker,Space, message } from 'antd';
import moment, { months } from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import { toast } from 'react-toastify';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
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
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
            this.setState({
                username:'',
                firstname:'',
                lastname:'',
                email:'',
                phone:'',
                address:'',
                birthday:'',
                gender:'',
                setValue:'0'
            })
        })
    }
    componentDidMount() {
    }
    toggle =()=>{
       this.props.toggleFromParent();
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
                toast.error('Bạn chưa nhập: '+ arrInput[i] + ' ,vui lòng điền đầy đủ thông tin !!!');
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid == true){
            // let date =  new Date(this.state.birthday).getTime();
            let day = moment(this.state.birthday)
            this.setState({
                birthday:day
            })
            this.props.createNewUser(this.state);
            
        }
    }
    
    onChange = (date,dateString) => {
        console.log(date);
        this.setState({
            birthday: date
        })
      };
    handleOptionChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            setValue:e.target.value,
            gender:e.target.value,
        })
      };
    render() {
        return (
            <Modal size="mg" isOpen={this.props.isOpen} toggle={(e)=>{this.toggle(e)}} className={"modal-user-container"}>
            <ModalHeader toggle={()=>{this.toggle()}}>Tạo Mới</ModalHeader>
            <ModalBody>
                
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Tên Đăng Nhập (*) :</label>
                            <input type='username' value={this.state.username}
                            onChange={(event)=> {this.handleOnChangeInput(event,'username')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Họ (*):</label>
                            <input type='text'value={this.state.firstname}
                            onChange={(event)=> {this.handleOnChangeInput(event,'firstname')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Tên (*) :</label>
                            <input type='text' value={this.state.lastname}
                            onChange={(event)=> {this.handleOnChangeInput(event,'lastname')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Email (*):</label>
                            <input type='email'value={this.state.email}
                            onChange={(event)=> {this.handleOnChangeInput(event,'email')}}/>
                        </div>
                        <div className='input-container max-w-input'>
                            <label>Điện Thoại(*) :</label>
                            <input type='text'value={this.state.phone}
                            onChange={(event)=> {this.handleOnChangeInput(event,'phone')}}/>
                        </div>
                        <div className='input-container max-w-input'>
                            <label>Địa chỉ :</label>
                            <input type='text'value={this.state.address}
                            onChange={(event)=> {this.handleOnChangeInput(event,'address')}}/>
                        </div>
                        
                        <div className='input-container max-w-input'>
                            <label>Ngày Sinh(*) :</label>
                                <Space direction="vertical">
                                    <DatePicker name='birthday' format={'DD/MM/YYYY'} 
                                        // value={moment(this.state.birthday)}
                                        value={this.state.birthday}
                                     onChange={this.onChange} />
                                </Space>
                        </div>
                        <div className='input-container max-w-input'>
                            <label>Giới Tính(*) :</label>
                                <div className='gender-input'>
                                    <Radio.Group onChange={this.handleOptionChange} value={this.state.gender}>
                                        <Radio value={'0'}>nam</Radio>
                                        <Radio value={'1'}>nữ</Radio>
                                    </Radio.Group>
                                </div>
                        </div>
                </div>
                
             
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className='px-3' onClick={()=>{this.handleAddNewUser()}}>Tạo </Button>{' '}
              <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Đóng</Button>
            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);