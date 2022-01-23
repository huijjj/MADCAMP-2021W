import React from 'react';
import './Main.css';

function Main( {getId} ) {
    return (
    <div className='mainbackground'>
        <div className='domainstructure'>
            <div className='domain'>김민채의 요리보고 조리보고~!</div>
            <div>
                <div className='loginlink'><a href='/login'>기존 회원이신가요?</a></div>
                <div className='registerlink'><a href="/register">신규 회원이신가요?</a></div>
            </div>
        </div>
    </div>
    );
}

export default Main;