/* eslint-disable */

import React, { useState, useRef, useEffect} from 'react';
// import './RestAPI.css';
import axios from 'axios'; // fetch 보단 axios를 사용하자
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // react-image-crop 별로임 canvas를 써야되는데 코드도 길고 레퍼런스가 너무 옛날꺼임
import { FileUploader } from "react-drag-drop-files";
import "../styles/style.scss"

function RestAPI() {
    // const [text, setText] = useState('test');
    // const [Img, setImg] = useState('');

    // const [title , setTitle] = useState("");
    // const [image , setImage] = useState('');
    
    const cropperRef = useRef(null);
    // 유저가 첨부한 이미지
    // const [inputImage, setInputImage] = useState(null);
    // 유저가 선택한 영역만큼 크롭된 이미지
    const [croppedImage, setCroppedImage] = useState(null);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    };  

    const dataURLtoFile = () => {
        let dataurl = {croppedImage}['croppedImage']
        // console.log(dataurl)
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        var file = new File([u8arr], 'base64_to_img.jpg', {type:mime});
        console.log(file)
        // console.log(typeof(file))
        // console.log(file.name)
        // console.log(typeof(file.name))
        const fd = new FormData();
        fd.append('image', file);
        // fd.append('title', file.name);
        axios
        .post('http://127.0.0.1:8000/api/image/', fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(function(response){
            console.log(response);
            response['status'] === 200 || 201 ? console.log('ITS 200 OR 201') : console.log('ITS not working!')
            
        })
        .catch(function(error){
            console.log(error);
        });
    }

    const fileTypes = ["JPEG", "PNG", "GIF","JPG"];


      const [file, setFile] = useState(null);
      const handleChange = (file) => {
    //   const handleChange = (e) => {
        setFile(URL.createObjectURL(file[0]));
        // setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file[0])
        console.log(typeof(file))

      };
      
      const [ScrollY, setScrollY] = useState(0);
      const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
      
      const handleFollow = () => {
        setScrollY(window.pageYOffset);
        if(ScrollY > 100) {
          // 100 이상이면 버튼이 보이게
          setBtnStatus(true);
        } else {
          // 100 이하면 버튼이 사라지게
          setBtnStatus(false);
        }
      }
    
      const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        setScrollY(0);  // ScrollY 의 값을 초기화
        setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
      }
    
      useEffect(() => {
        const watch = () => {
          window.addEventListener('scroll', handleFollow)
        }
        watch();
        return () => {
          window.removeEventListener('scroll', handleFollow)
        }
      })

    return (
        <div className='wrap'>
            <button 
                className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
                onClick={handleTop}  // 버튼 클릭시 함수 호출
                >TOP</button>
            <div>
            <div className="Crop">
          <h1>자르고 싶은 영역을 선택해 주세요.</h1>
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            // handleChange={(e)=>{setFile(URL.createObjectURL(e.target.files[0]))}}
            name="file"
            types={fileTypes}
          />

          <div>{file && (
                    <div>
                        <Cropper
                            src={file}
                            // crop={onCrop}
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            initialAspectRatio={16 / 9}
                        />
                        
                        <button onClick={()=>{console.log(typeof({croppedImage}['croppedImage']))}}>CROP LOG type</button>
                        <button onClick={()=>{console.log({croppedImage})}}>CROP LOG</button>
                        <button onClick={onCrop}>CROP</button>
                        
                    </div>
                )}</div>
        </div>

                            
                {croppedImage && (
                    <div>
                        <img src={croppedImage} />
                        <button onClick={dataURLtoFile}>base64Image to imagefile POST</button>
                    </div>
                )}
            </div>
            <div className=''>
                <button
                onClick={() => {
                    axios
                        .get('http://127.0.0.1:8000/image/',{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }
                        })
                        .then((response) => {
                            
                            // let copy = response.data['results'] 
                            // setText(response.data['results'][4].image);
                            // console.log('response.data-> ', typeof(response.data));
                            console.log('response-> ', response['status']);
                            // console.log(response.data['results']);
                            // console.log(typeof(response.data['results'][0].image));
                            console.log(response.data[0].image);
                            setImg(response.data[0].image);
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                }}
                >
                GET
                </button>
                

                {/* <div>
                    <input type='file' accept='img/*' onChange={(e)=>setImage(e.target.files[0])}></input>
                    <button onClick={()=>{console.log({image}['image'])}}>Post log</button>
                    <button onClick={()=>{console.log({title}['title'])}}>Post log</button>
                    <input 
                        placeholder='title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <button
                    onClick={()=>{
                        const formdata = new FormData();
                        formdata.append('image', {image}['image']);
                        formdata.append('title', {title}['title']);

                        axios
                        .post('http://127.0.0.1:8000/image/', formdata)
                        .then(function(response){
                            console.log(response);
                        })
                        .catch(function(error){
                            console.log(error);
                            console.log({title}['title'])
                            console.log(typeof({image}['image']))
                            console.log({image}['image'])
                        });
                    }}
                    >
                    POST
                    </button>
                </div> */}
            </div>
        </div>
      );
}

export default RestAPI;