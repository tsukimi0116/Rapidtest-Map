import React from 'react';
import { Button } from 'antd';

const Home = () => {

    return (
        <div className='Home'>
            <h1>家用快篩地圖</h1>
            <div className='btn'>
                <Button href='/list' size='large' type='primary'>開始使用</Button>
            </div>
            <div>
                <Button href='/store' size='large' type='primary'>儲存機構</Button>
            </div>
            <span className='ver'>v1.0.0</span>
        </div>
    );
};

export default Home;