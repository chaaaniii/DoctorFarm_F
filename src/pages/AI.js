import React, { useContext, useState } from "react";
// import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import AuthContext from '../context/AuthContext'

import "./AI.scss";

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
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button className="AI-button" onClick={() => onImageRemove(index)}>Remove</button>
                      <button className="AI-button"
                        onClick={() => {

                          const formdata = new FormData();
                          formdata.append("image", { image }['image']['file']);
                          console.log({ image }['image'])
                          console.log(user)
                          console.log(localStorage.getItem("token"))
                          formdata.append('email', user)
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
          <h1>111</h1>
          <button
            onClick={() =>
              axios
                .get("http://127.0.0.1:8000/detected_image/", {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                .then(function (response) {
                  console.log(response.data);
                  setdImage(response.data[0].image);
                })
                .catch(function (error) {
                  console.log(error);
                })
            }
          >
            detected_image
          </button>
          <img src={dImage} width="600" height="400"></img>
          <button onClick={() => {
             setFlag(true)
             setdImage(null)
           }}>back</button>
        </div>
      )}

    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<AI/>, rootElement);
