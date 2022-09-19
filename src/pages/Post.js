import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.scss";
import defaultimg from "../components/img/default.png";
import { useNavigate } from "react-router-dom";

//에디터
// import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';


export default function Post() {
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] = useState(null);
  const [solution_image, setSolution_image] = useState(null);
  const [preview_image, setPreview_image] = useState(null);


  const saveSolutionImage = (e) => {
    setPreview_image(URL.createObjectURL(e.target.files[0]));
    setSolution_image(e.target.files[0])
  }


  const [post, setPost] = useState({
    detected_contents: "",
    solution_contents: "",
    is_public: false,
  });

  const {
    detected_contents,
    solution_contents,
    is_public,
  } = post;

  const onChange = (e) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onClickTempHandler = () => {
    try {
      const formdata = new FormData();
      // formdata.append('detected_image');
      formdata.append('detected_class', detected_default_solution);
      formdata.append('detected_default_solution', detected_default_solution);
      {solution_image && (formdata.append('solution_image', solution_image))};
      formdata.append('detected_contents', post.detected_contents);
      formdata.append('solution_contents', post.solution_contents);
      formdata.append('is_public', post.is_public);
      console.log(detected_image)
      console.log(typeof (detected_image))
      axios.post("http://localhost:8000/post/solutions/", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.error(e.message);
    }
    navigate("/ai")
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8000/detected_image/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        const _img = await res.data.map((rowData) => ({
          id: rowData.id,
          class_id: rowData.class_id,
          image: rowData.image,
        }));
        setDetected_image(_img[0].image);
        setDetected_default_solution(_img[0].class_id);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  // //에디터
  // // Editor DOM 선택용
  // const editorRef = useRef();

  // // 등록 버튼 핸들러
  // const handleRegisterButton = () => {
  //   // 입력창에 입력한 내용을 HTML 태그 형태로 취득
  //   console.log(editorRef.current?.getInstance().getHTML());
  //   // 입력창에 입력한 내용을 MarkDown 형태로 취득
  //   console.log(editorRef.current?.getInstance().getMarkdown());
  // };



  return (
    <>
      <div className="Mypage-title">
        <p><b>아 몰라 씨앗~</b></p>
      </div>
      <div className="Mypage-contents">
        <p>진단받은 농작물의 개선된 이미지를 업로드하여</p>
        <p>다른 사용자들에게 노하우를 공유하고 포인트도 챙겨보세요!</p>
      </div>
      <div className="D_body">
        <img className="DS_img1" src={detected_image} width="300" height="200" />
        <span className="D_solution">
          <p>{detected_default_solution}</p>
          <input
            name="detected_contents"
            placeholder="detected_contents"
            onChange={onChange}
            value={detected_contents}
          />
        </span>
        <br />
        <p />
      </div>
      <div>
        {/* <input type='file' accept='img/*' onChange={(e)=>setSolution_image(e.target.files[0])}></input> */}
        <input className="pv_input" type='file' accept='img/*' onChange={saveSolutionImage}></input>
        <div>
          {solution_image ? <img className="DS_img2" src={preview_image} alt="" width="300" heigh="200" /> : <img className="DS_img2" src={defaultimg} />}
        </div>
        <br />
        <span className="S_solution">
          <textarea
            className="textarea"
            name="solution_contents"
            placeholder="solution_contents"
            onChange={onChange}
            value={solution_contents}
          />
        </span>
        <br />
        <p></p>
        <button onClick={onClickTempHandler}>임시저장</button>
        {/* <button onClick={() => { }}>Public POST</button> */}
      </div>
    </>
  );
};


