import React, { useState } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import StoreList from './Components/StoreList';

const { Option } = Select;

const List = () => {

    const [searchData, setSearchData] = useState({});

    const countryData = ['臺北市', '新北市', '基隆市', '桃園市', '新竹縣', '新竹市', '苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'];

    const finishHandler = (value) => {
        setSearchData(value);
    };

    return (
        <div className='List'>
            <Form className='listForm' onFinish={finishHandler}>
                <Form.Item name='country' rules={[
                    {
                        required: true,
                        message: 'Please input your country!',
                    },
                ]}>
                    <Select placeholder="請選擇縣市" style={{ width: '100px' }}>
                        {Array.isArray(countryData) &&
                            countryData.map((element, index) => (
                                <Option key={index} value={element}>{element}</Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{ marginRight: '10px', marginLeft: '10px' }} name='storename'>
                    <Input placeholder="請輸入關鍵字"/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>搜尋</Button>
                </Form.Item>
            </Form>
            <hr/>
            <StoreList searchData={searchData}/>
            <Button href="/store" className='rebtn'><ReloadOutlined/></Button>
        </div>
    );
};

export default List;