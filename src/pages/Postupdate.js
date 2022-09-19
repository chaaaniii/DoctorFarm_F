import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import defaultimg from "../components/img/default.png"
import { useNavigate } from "react-router-dom";

const PostUpdate = () => {
  const { state } = useLocation();
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] = useState(null);
  const [solution_image, setSolution_image] = useState(null);
  const [preview_image, setPreview_image] = useState(null);

  const navigate = useNavigate()

  const saveSolutionImage = (e) => {
    setPreview_image(URL.createObjectURL(e.target.files[0]));
    setSolution_image(e.target.files[0])
    console.log(e.target.files[0])
    console.log(typeof(e.target.files[0]))
  }

  const [post, setPost] = useState({
    // detected_image: null,
    detected_contents: "",
    // solution_image: null,
    solution_contents: "",
    is_public: false,
  });

  const {
    // detected_image,
    // detected_default_solution,
    detected_contents,
    // solution_image,
    solution_contents,
    is_public,
  } = post;

  const onChange = (e) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
    console.log(post.solution_contents)
  };

  const onClickTempHandler = () => {
    try {
      const formdata = new FormData();
      // formdata.append('detected_image');
      formdata.append("detected_class", detected_default_solution);
      formdata.append("detected_default_solution", detected_default_solution);
      formdata.append('solution_image', solution_image);
      formdata.append("detected_contents", post.detected_contents);
      formdata.append("solution_contents", post.solution_contents);
      formdata.append("is_public", post.is_public);
      console.log(post.solution_contents);
      console.log(typeof detected_image);
      axios.put(`http://127.0.0.1:8000/post/mypage/${state}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      navigate("/mypage");
    } catch (e) {
      console.error(e.message);
    }
  };

  const onClickTempHandler1 = () => {
    try {
      const formdata = new FormData();
      // formdata.append('detected_image');
      formdata.append("detected_class", detected_default_solution);
      formdata.append("detected_default_solution", detected_default_solution);
      formdata.append("solution_image", solution_image);
      formdata.append("detected_contents", post.detected_contents);
      formdata.append("solution_contents", post.solution_contents);
      formdata.append("is_public", true);
      console.log(detected_image);
      console.log(typeof detected_image);
      axios.put(`http://127.0.0.1:8000/post/mypage/${state}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      navigate("/mypage");
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(state);
        const res = await axios.get(
          `http://127.0.0.1:8000/post/mypage/${state}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        const _data = res.data
        setDetected_image(_data['detected_image']);
        setDetected_default_solution(_data['detected_default_solution']);
        setPreview_image(_data['solution_image']);

        let url = _data['solution_image']
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        var file =  new File([data], filename, metadata);

        // setPost(_data['solution_contents']);
        setSolution_image(file);
        console.log(typeof(solution_contents))
        console.log(detected_default_solution)

      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="Mypage-title">
        <p><b>수정 페이지</b></p>
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
        <button onClick={onClickTempHandler1}>게시하기</button>

      </div>
    </>
  );
};

export default PostUpdate;