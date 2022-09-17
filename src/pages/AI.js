import React, { useContext, useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./AI.scss";
import "antd/dist/antd.min.css";
import { Carousel, Card } from "antd";
import pepper from "../components/img/berry.jpg";
import ad from "../components/img/ad.png";
import Loading from "../loading/loading";
import drfarmlogo from "../components/img/제목 없음.png"
import { useNavigate } from "react-router-dom"


export default function AI() {
  const [images, setImages] = React.useState([]);
  const onChange = (imageList) => {
    setImages(imageList);
  };
  let [flag, setFlag] = useState(true);
  let { user } = useContext(AuthContext);
  let [dImage, setdImage] = useState(null);
  let failed = false;

  const firmUser = localStorage.getItem("user");

  //로딩 스피너 부분
  const [loading, setloading] = useState(true);

  const { Meta } = Card;

  //post버튼 solution 연동
  const navigate = useNavigate()

  const gotoSolution = () => {
    navigate("/post")
  }
  return (
    <div className="AI-bg">
      {flag ? (
        <div className="App">
            <img className="drfarmlogo" src={drfarmlogo} />
          <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {imageList.length <=0 &&(
                <button
                  className="drop-area"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  이곳에 이미지를 넣어주세요.
                </button> )}

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img className="preimg" src={image.data_url} alt="" />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="AI-button"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </button>
                      <button
                        className="AI-button"
                        onClick={() => {
                          const formdata = new FormData();
                          formdata.append("image", { image }["image"]["file"]);
                          console.log({ image }["image"]);
                          console.log(user);
                          console.log(localStorage.getItem("token"));
                          formdata.append("email", firmUser);
                          // formdata.append("title", { title }["title"]);

                          axios
                            .post("http://127.0.0.1:8000/image/", formdata, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            })
                            .then(function (response) {
                              console.log(response);
                              axios
                                .get("http://127.0.0.1:8000/ML/", {
                                  params: { firmUser },
                                })
                                .catch(function (error) {
                                  console.log(error.response.status);
                                  if (error.response.status === 404) {
                                    failed = true;
                                    alert(
                                      "병해가 감지되지 않았습니다 다른 사진을 업로드 해주세요!"
                                    );
                                  } else {
                                    console.log("success");
                                  }
                                })
                                .then(function (res) {
                                  console.log(res);
                                  if (failed == false) {
                                    setFlag(false);
                                    setloading(true);
                                    axios
                                      .get(
                                        "http://127.0.0.1:8000/detected_image/",
                                        {
                                          headers: {
                                            Authorization: `Bearer ${localStorage.getItem(
                                              "token"
                                            )}`,
                                          },
                                        }
                                      )
                                      .then(function (response) {
                                        setdImage(response.data[0].image);
                                        setloading(false);
                                      })
                                      .catch(function (error) {
                                        console.log(error);
                                      });
                                  }
                                });
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
          {loading ? (
            <Loading />
          ) : (
            <div>
              <p className="dstitle">진단결과</p>
              <img className="dimg" src={dImage} width="600" height="400"></img>
              <p className="dstitle">유사증상</p>
              <div data-aos="fade-up-left" className="Card1">
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
              </div>
              <p className="dstitle">농약추천</p>
              <div data-aos="fade-up-right" className="Card1">
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img src={pepper} />}
                  >
                    <Meta title="AI 진단" description="www.ai진단.com" />
                  </Card>
                </span>
              </div>
              <button className="aibtn"
                onClick={() => {
                  setFlag(true);
                  setdImage(null);
                }}
              >
                back
              </button>
              <button className="aibtn" onClick={gotoSolution}>Post</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
