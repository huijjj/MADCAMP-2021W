import React from 'react';
import './Main.css';

function Main() {
    return (
    <div className='mainbackground'>
        <div className='domainstructure'>
            <div className='domain'>
                <img className='titleBanner' style={{ width:"80%"}} src={'/images/banner.png'}/>
            </div>
            <div>
                <div className='loginlink'><a href='/login'>기존 회원이신가요?</a></div>
                <div className='registerlink'><a href="/register">신규 회원이신가요?</a></div>
            </div>
        </div>
    </div>
    );
}

export default Main;