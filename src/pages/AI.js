import React, { useContext, useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./AI.scss";
import "antd/dist/antd.min.css";
import { Carousel, Card } from "antd";
import pepper from "../components/img/berry.jpg";
import partner from "../components/img/partner2.png"
import ad from "../components/img/ad.png";
import Loading from "../loading/loading";
import drfarmlogo from "../components/img/제목 없음.png"
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert2';
// import dicObject from "./crop_dist"

export default function AI() {
  const [images, setImages] = React.useState([]);
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const [flag, setFlag] = useState(true);
  const { user } = useContext(AuthContext);
  const [dImage, setdImage] = useState(null);
  const [class_id, setClass_id] = useState(null);
  const [symptom, setSymptom] = useState(null);
  const [dsolution, setDsolution] = useState(null);
  const [pesticide, setPesticide] = useState([{
    id: null,
    item_name: null,
    igr_content: null,
    purpose: null,
    formulation: null,
    company: null,
    partner_company: null,
    pesticide_image: null,
  },
  ]);
  const null_pesicide = [{
    id: null,
    item_name: null,
    igr_content: null,
    purpose: null,
    formulation: null,
    company: null,
    partner_company: null,
    pesticide_image: null,
  }]
  const [similar, setSimilar] = useState({
    0: [null, null],
    1: [null, null],
    2: [null, null]
  });

  let failed = false;
  const dicObject = {
    1: '고추 - 탄저병',
    2: '고추 - 흰가루병',
    3: '고추 - 질소(N)결핍',
    4: '고추 - 인(P)결핍',
    5: '고추 - 칼륨(K)결핍',
    6: '고추 - 칼슘(Cal)결핍',
    7: '토마토 - 흰가루병',
    8: '토마토 - 잿빛곰팡이병',
    9: '토마토 - 질소(N)결핍',
    10: '토마토 - 인(P)결핍',
    11: '토마토 - 칼륨(K)결핍',
    12: '토마토 - 칼슘(Cal)결핍',
    13: '오이 - 흰가루병',
    14: '오이 - 노균병',
    15: '딸기 - 흰가루병',
    16: '딸기 - 잿빛곰팡이병',
    17: '포도 - 탄저병',
    18: '포도 - 노균병',
  }
  const [code_anwser, setCode_anwser] = useState(null)
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
          <div className="AI-title">
            <p><b>진단하기</b></p>
          </div>
          <div className="AI-contents">
            <p>병든 농작물의 사진을 업로드하여</p>
            <p>병해를 진단받고 솔루션을 받아보세요.</p>
          </div>
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
                {imageList.length <= 0 && (
                  <button
                    className="drop-area"
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    이곳에 이미지를 넣어주세요.
                  </button>)}

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img className="preimg" src={image.data_url} alt="" />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="AI-button"
                        onClick={() => onImageRemove(index)}
                      >
                        제거하기
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
                            .post("http://211.184.190.112:8000/image/", formdata, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            })
                            .then(function (response) {
                              console.log(response);
                              // setloading(true)
                              axios
                                .get("http://211.184.190.112:8000/ML/", {
                                  params: { firmUser },
                                })
                                .catch(function (error) {
                                  console.log(error.response.status);
                                  if (error.response.status === 404) {
                                    failed = true;
                                    swal.fire({
                                      icon: 'error',
                                      text: '병해가 감지되지 않았습니다!'
                                    })
                                    // alert(
                                    //   "병해가 감지되지 않았습니다 다른 사진을 업로드 해주세요!"
                                    // );
                                  } else {
                                    console.log("success");
                                  }
                                })
                                .then(function (res) {
                                  console.log(res);
                                  if (failed == false) {
                                    setFlag(false);
                                    // setloading(true);
                                    axios
                                      .get(
                                        "http://211.184.190.112:8000/detected_image/",
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

                                        setClass_id(response.data[0].class_id);
                                        var class_id_real = response.data[0].class_id
                                        setCode_anwser(dicObject[response.data[0].class_id])
                                        axios
                                          .get(
                                            `http://211.184.190.112:8000/solutions/${response.data[0].class_id}`,
                                            {
                                              headers: {
                                                Authorization: `Bearer ${localStorage.getItem(
                                                  "token"
                                                )}`,
                                              },
                                            }
                                          )
                                          .then(function (res) {
                                            console.log(res);
                                            setSymptom(res.data.symptom);
                                            setDsolution(res.data.solution_default);
                                            axios
                                              .get(
                                                `http://211.184.190.112:8000/solutions/pesticide/?code_id=${response.data[0].class_id}`,
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${localStorage.getItem(
                                                      "token"
                                                    )}`,
                                                  },
                                                  
                                                }
                                              )
                                              .then(function (res) {
                                                console.log(res.data);
                                                const _pesticide = res.data.map((rowData) => ({
                                                  id: rowData.id,
                                                  item_name: rowData.item_name,
                                                  igr_content: rowData.igr_content,
                                                  purpose: rowData.purpose,
                                                  formulation: rowData.formulation,
                                                  company: rowData.company,
                                                  partner_company: rowData.partner_company,
                                                  pesticide_image: rowData.pesticide_image,
                                                }));
                                                setPesticide(pesticide.concat(_pesticide));
                                                console.log(_pesticide)
                                                axios
                                                  .get(
                                                    `http://211.184.190.112:8000/ML/deepranking/`,
                                                    {
                                                      headers: {
                                                        Authorization: `Bearer ${localStorage.getItem(
                                                          "token"
                                                        )}`,
                                                      },
                                                      params: { class_id_real }
                                                    }
                                                  )
                                                  .then(function (res) {
                                                    console.log(res.data);
                                                    console.log(JSON.parse(JSON.stringify(res.data)))
                                                    setSimilar(JSON.parse(JSON.stringify(res.data)))
                                                    setloading(false);
                                                  }
                                                  )
                                              }
                                              )
                                          }
                                          )
                                      })
                                      .catch(function (error) {
                                        console.log(error);
                                      }

                                      );
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
                        진단하기
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
              <div className="dsBg">
                <img className="dimg" src={dImage} width="35%" height="430"></img>
                <p className="dd-title" ><b>💥{code_anwser}💥</b></p>
                <p className="dd-symptom" >{symptom}</p>
                <div className="dd-solution" >
                  <p className="dd-s-title"><b>⭐해결방안⭐</b></p>
                  <p>{dsolution}</p>
                </div>
              </div>
              <p className="dstitle">유사증상</p>
              <div data-aos="fade-up-left" className="Card1">
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 400, height: 600 }}
                    cover={<img className="similar_card" src={similar['0'][1]} />}
                  >
                    <Meta title="해결방법" description={similar['0'][0]} />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 400, height: 600 }}
                    cover={<img className="similar_card" src={similar['1'][1]} />}
                  >
                    <Meta title="해결방법" description={similar['1'][0]} />
                  </Card>
                </span>
                <span className="Card1__Card2">
                  <Card
                    hoverable
                    style={{ width: 400, height: 600 }}
                    cover={<img className="similar_card" src={similar['2'][1]} />}
                  >
                    <Meta title="해결방법" description={similar['2'][0]} />
                  </Card>
                </span>
              </div>


              <p className="dstitle">농약추천</p>
              <div data-aos="fade-up-right" className="Card1">
                {pesticide.filter(data => data.id !== null).map((data) => {
                  return (
                    <div key={data.id}>
                      {`${data.partner_company}` == "제휴" && <img className="partner_img" src={partner} />}
                      <span >
                        <Card
                          hoverable
                          className="pesticide_card"
                          style={{ width: 400, height: 580 }}
                          cover={<img className="pesticide_img" src={data.pesticide_image} />}
                        >

                          <Meta title={data.item_name} />
                          &nbsp;
                          <li>주성분 함량 = {data.igr_content}</li>
                          <li>용도 = {data.purpose}</li>
                          <li>제형 = {data.formulation}</li>
                          <li>제조회사 = {data.company}</li>
                          {/* <li>제휴여부 = {data.partner_company}</li> */}
                        </Card>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="aibtn"
                onClick={() => {
                  // setFlag(true);
                  // setdImage(null);
                  // setloading(true);
                  // setPesticide(pesticide.concat(null_pesicide))
                  // console.log(pesticide)
                  // window.scrollTo(0, 0);
                  navigate("/")
                }}
              >
                돌아가기
              </button>
              <button className="aibtn" onClick={gotoSolution}>임시저장</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
