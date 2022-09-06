import React, { useState, useEffect } from "react";
// import AuthContext from '../context/AuthContext'
import axios from "axios";

const Post = () => {
  // let {registerUser} = useContext(AuthContext)
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] = useState(null);
  // const [detected_contents, setDetected_contents] = useState(null)
  const [solution_image, setSolution_image] = useState(null);
  // const [solution_contents, setSolution_contents] = useState(null)
  // const [is_public, setIs_public] = useState(false)

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

  const onChangeSolutionImage = (e) => {
    console.log(solution_image)
    console.log(e.target.files[0])

    setSolution_image(e.target.files[0])
    console.log(solution_image)
  }


  const onClickTempHandler = () => {
    try {
      const formdata = new FormData();
      // formdata.append('detected_image');
      formdata.append('detected_class', detected_default_solution);
      formdata.append('detected_default_solution', detected_default_solution);
      formdata.append('solution_image', solution_image);
      formdata.append('detected_contents', post.detected_contents);
      formdata.append('solution_contents', post.solution_contents);
      formdata.append('is_public', post.is_public);
      console.log(detected_image)
      console.log(typeof(detected_image))
      axios.post("http://127.0.0.1:8000/post/solutions/", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.error(e.message);
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/detected_image/", {
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
  
  return (
    <div>
      <h1>Post</h1>
      <img src={detected_image} width="300" height="200" />
      <p>{detected_default_solution}</p>
      <input
        name="detected_contents"
        placeholder="detected_contents"
        onChange={onChange}
        value={detected_contents}
      />
      <br/>
      <p/>
      {/* <input type='file' accept='img/*' onChange={(e)=>setSolution_image(e.target.files[0])}></input> */}
      <input type='file' accept='img/*' onChange={onChangeSolutionImage}></input>
      <div className="preview">
        {solution_image && <img src={solution_image} alt={solution_image}></img>}
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
      <p>{post.detected_contents}</p>
      <p>{post.solution_contents}</p>
    </div>
  );
};

export default Post;
