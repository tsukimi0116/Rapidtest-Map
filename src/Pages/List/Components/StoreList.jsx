import React, { useEffect, useState } from 'react';
import { Card, Modal } from 'antd';
import Axios from 'axios';

const StoreList = ({ searchData }) => {
    const [initData, setInitData] = useState([]);

    const [Data, setData] = useState([]);

    const storeData = [];

    const dataset = async () => {
        try {
            let result = await Axios.get('https://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D03001-001&l=https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv');

            let totalData = result.data.split(',');

            let filterFunc = (remainder) => {
                let result = totalData.filter(function(item, index) {
                    return index % 9 === remainder;
                });
                result.shift();
                return result;
            };

            let hospitalArray = filterFunc(1);
            let addressArray = filterFunc(2);
            let phoneArray = filterFunc(5);
            let nameArray = filterFunc(6);
            let numArray = filterFunc(7);
            let remarkArray = filterFunc(0);

            let forData = [];
            for (let i = 0; i < hospitalArray.length; i++) {
                forData.push({
                    hospital: hospitalArray[i],
                    address: addressArray[i],
                    phone: phoneArray[i],
                    name: nameArray[i],
                    num: numArray[i],
                    remark: remarkArray[i],
                });
            }
            setData(forData);

            let init = forData.filter(function(val, idx) {
                return idx < 10;
            });

            setInitData(init);

        }
        catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {
        if (searchData.country !== undefined && (searchData.storename === undefined)) {
            let result = Data.filter(function(val) {
                return val.address.includes(searchData.country);
            });
            setInitData(result);
        }
        else if (searchData.country !== undefined && (searchData.storename === '')) {
            let result = Data.filter(function(val) {
                return val.address.includes(searchData.country);
            });
            setInitData(result);
        }
        else if (searchData.country !== undefined && searchData.storename !== undefined) {
            let result = Data.filter(function(val) {
                return val.address.includes(searchData.country);
            });
            let result2 = result.filter(function(val) {
                return val.hospital.includes(searchData.storename);
            });
            setInitData(result2);
        }
        else {
            dataset();
        }

    }, [searchData]);


    const onClick = (event) => {
        Modal.confirm({
            title: '是否儲存此筆店家',
            okText: '儲存',
            cancelText: '返回',
            onOk: () => {
                let text = event.nativeEvent.path[2].innerText;
                let storeArray = text.split('\n\n');
                let storeObj = {
                    num: storeArray[0],
                    hospital: storeArray[1],
                    address: storeArray[2],
                    name: storeArray[3],
                    remark: storeArray[4],
                };
                storeData.push(storeObj);
                sessionStorage.setItem('store', JSON.stringify(storeData));
            },
        });
        console.log(event);
    };

    return (
        <div className='ListCard'>
            {Array.isArray(initData) &&
                initData.map((element, index) => (
                    <Card onClick={onClick} key={index} style={{ width: 350 }}>
                        <span>剩餘數量:{element.num}</span>
                        <p>{element.hospital} {element.phone}</p>
                        <p>{element.address}</p>
                        <p>{element.name}</p>
                        <p>{element.remark}</p>
                    </Card>
                ))}
        </div>

    );
};

export default StoreList;