import axios from 'axios';
import React, { useState, useEffect } from 'react'

function ImageList() {
    const [imgList, setImgListData] = useState([{
        id: null,
        image: null,
        title: null,
    }])

    // useEffect(async() => { //uesEffect 에서 async로 axios 사용 시 error 발생
    useEffect(() => {
        async function fetchData() {
            console.log('Img List ON screen');
            try {
                const res = await axios.get('http://127.0.0.1:8000/image')
                console.log(res.data['results'])
                const _imgList = await res.data['results'].map((rowData) => ({
                    id: rowData.id,
                    title: rowData.title,
                    image: rowData.image
                })
                )
                // setImgListData(..._imgList);
                setImgListData(imgList.concat(_imgList));
            } catch (e) {
                console.error(e.message)
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='list'>
                <button onClick={() => { console.log(imgList) }}>Get</button>
                <h1>Image List</h1>
                {imgList.filter(data => data.id !== null).map((data) => {
                    return (
                        <div className='imageList' key={data.id}>
                            <h3>{data.id}</h3>
                            <h3>{data.title}</h3>
                            <img src={data.image} width='600' height='400' />
                            <hr />
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default ImageList