import React, { useContext, useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import AuthContext from '../context/AuthContext'
import "./AI.scss";
import "antd/dist/antd.min.css";
import { Carousel, Card } from "antd";
import pepper from '../components/img/berry.jpg'
import ad from '../components/img/ad.png'

import Loading from "../loading/loading";

export default function AI() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  let [flag, setFlag] = useState(true);
  let { user } = useContext(AuthContext)
  let [dImage, setdImage] = useState(null);

  const firmUser = localStorage.getItem("user");

  //로딩 스피너 부분
  const [loading, setloading] = useState(true);

  const { Meta } = Card;


  return (

    <div className="AI-bg">
      {flag ? (
        <div className="App">
          <ImageUploading
            // multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "jfif"]}
          >

            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button className="drop-area"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  이곳에 이미지를 넣어주세요.
                </button>

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" height="70" />
                    <div className="image-item__btn-wrapper">
                      <button className="AI-button" onClick={() => onImageRemove(index)}>Remove</button>
                      <button className="AI-button"
                        onClick={() => {

                          const formdata = new FormData();
                          formdata.append("image", { image }['image']['file']);
                          console.log({ image }['image'])
                          console.log(user)
                          console.log(localStorage.getItem("token"))
                          formdata.append('email', firmUser)
                          // formdata.append("title", { title }["title"]);

                          axios
                            .post("http://127.0.0.1:8000/image/", formdata, {
                              headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              }
                            })
                            .then(function (response) {
                              console.log(response);
                              axios.get("http://127.0.0.1:8000/ML/",
                                { params: { firmUser } }
                              )
                                .then(function (response) {
                                  console.log(response)
                                  setFlag(false)
                                  setloading(true)
                                  // setTimeout(() => console.log("after"), 3000);
                                  // setTimeout()

                                  axios
                                    .get("http://127.0.0.1:8000/detected_image/", {
                                      headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                      },
                                    })
                                    .then(function (response) {
                                      console.log(response.data);
                                      setdImage(response.data[0].image);
                                      setloading(false)
                                    })
                                    .catch(function (error) {
                                      console.log(error);
                                    })
                                })
                            })
                            .catch(function (error) {
                              console.log(error);
                              // console.log({ title }["title"]);
                              console.log(typeof { image }["image"]);
                              console.log({ image }["image"]);
                            });
                        }}
                      >
                        POST
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>

      ) : (
        <div>
          &nbsp;
          {loading ?
            <Loading />
            : (
              <div>
                <img className="dimg" src={dImage} width="600" height="400"></img>
                <div data-aos="fade-up-left" className='Card1'>
                  <span className='Card1__Card2'>
                    <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
                      <Meta title="AI 진단" description="www.ai진단.com" />
                    </Card>
                  </span>
                  <span className='Card1__Card2'>
                    <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
                      <Meta title="AI 진단" description="www.ai진단.com" />
                    </Card>
                  </span>
                  <span className='Card1__Card2'>
                    <Card hoverable style={{ width: 300 }} cover={<img src={pepper} />}>
                      <Meta title="AI 진단" description="www.ai진단.com" />
                    </Card>
                  </span>
                </div>
                <img src={ad}></img>
                <button onClick={() => {
                  setFlag(true)
                  setdImage(null)
                }}>back</button>
              </div>
            )

          }

        </div>
      )}
    </div>
  );
}