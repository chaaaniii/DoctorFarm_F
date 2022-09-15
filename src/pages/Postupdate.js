import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import defaultimg from "../components/img/default.png"

const PostUpdate = () => {
  const { state } = useLocation();
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] = useState(null);
  const [solution_image, setSolution_image] = useState(null);
  const [preview_image, setPreview_image] = useState(null);

  const saveSolutionImage = (e) => {
    setPreview_image(URL.createObjectURL(e.target.files[0]));
    setSolution_image(e.target.files[0])
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
  };

  const onClickTempHandler = () => {
    try {
      const formdata = new FormData();
      // formdata.append('detected_image');
      formdata.append("detected_class", detected_default_solution);
      formdata.append("detected_default_solution", detected_default_solution);
      formdata.append("solution_image", solution_image);
      formdata.append("detected_contents", post.detected_contents);
      formdata.append("solution_contents", post.solution_contents);
      formdata.append("is_public", post.is_public);
      console.log(detected_image);
      console.log(typeof detected_image);
      axios.put(`http://127.0.0.1:8000/post/mypage/${state}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
        setSolution_image(_data['solution_image']);
        setPreview_image(_data['solution_image']);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="D_body">
      <img className="DS_img1"  src={detected_image} width="300" height="200" />
      <span className="D_solution">
      <p>{detected_default_solution}</p>
      <input
        name="detected_contents"
        placeholder="detected_contents"
        onChange={onChange}
        value={detected_contents}
      />
      </span>
      <br/>
      <p/>
      </div>
      <div>
      {/* <input type='file' accept='img/*' onChange={(e)=>setSolution_image(e.target.files[0])}></input> */}
      <input className="pv_input" type='file' accept='img/*' onChange={saveSolutionImage}></input>
      <div>
        {solution_image ? <img className="DS_img2" src={preview_image} alt="" width="300" heigh="200"/>:<img className="DS_img2" src={defaultimg}/>}
      </div>
      <br />
      <input
        name="solution_contents"
        placeholder="solution_contents"
        onChange={onChange}
        value={solution_contents}
      />
      <br />
      <p></p>
      <button onClick={onClickTempHandler}>SAVE Temporarily</button>
      <button onClick={() => {}}>Public POST</button>
 
    </div>
    </>
  );
};

export default PostUpdate;