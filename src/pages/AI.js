import React, {useContext} from "react";
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
  let {user} = useContext(AuthContext)




  return (
    <div className="AI-bg">
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg","jfif"]}
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
                <div className="image-item__btn-wrapper">
                  <button className="AI-button" onClick={() => onImageRemove(index)}>Remove</button>
                  <button className="AI-button"
                    onClick={() => {
                      const formdata = new FormData();
                      formdata.append("image", {image}['image']['file']);
                      console.log({image}['image'])
                      console.log(user)
                      console.log(localStorage.getItem("token"))
                      formdata.append('email', user )
                      // formdata.append("title", { title }["title"]);

                    axios
                    .post("http://127.0.0.1:8000/image/", formdata, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      }})
                    .then(function (response) {
                      console.log(response);
                      axios.get("http://127.0.0.1:8000/ML/",
                      {params: {user}}
                      )
                      .then(function(response){
                        console.log(response)
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
  </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<AI/>, rootElement);
