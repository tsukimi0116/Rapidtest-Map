import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";

const Store = () => {

    const [storeData, setStoreData] = useState([])

    const onClick = () => {
        setStoreData([])
        sessionStorage.removeItem('store')
    }

    useEffect(() => {
        setStoreData(JSON.parse(sessionStorage.getItem('store')))
    }, []);

    return (
        <div className='ListCard'>
            <h1 style={{ marginTop: '20px' }}>儲存機構</h1>
            {
                Array.isArray(storeData) &&
                storeData.map((element, index) => (
                    <Card key={index} style={{ width: 350 }}>
                        <span>{element.num}</span>
                        <p>{element.hospital}</p>
                        <p>{element.address}</p>
                        <p>{element.name}</p>
                        <p>{element.remark}</p>
                    </Card>
                ))
            }
            <div className='btn'>
                <Button id="clean" onClick={onClick} size='large' type="dashed" danger>清除資料</Button>
            </div>
            <div>
                <Button id="back" href='/' size='large' type='primary'>回首頁</Button>
            </div>
        </div >

    )
}

export default Store;