import React, { useState, useEffect } from "react";
// import AuthContext from '../context/AuthContext'
import axios from "axios";

const Post = () => {
  // let {registerUser} = useContext(AuthContext)
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] =
    useState(null);
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
      <img src={detected_image} />
      <p>{detected_default_solution}</p>
      <input
        name="detected_contents"
        placeholder="detected_contents"
        onChange={onChange}
        value={detected_contents}
      />
      <img src={solution_image} />
      <br />
      <input
        name="solution_contents"
        placeholder="solution_contents"
        onChange={onChange}
        value={solution_contents}
      />
      <br />
      <button onClick={() => {}}>SAVE Temporarily</button>
      <button onClick={() => {}}>Public POST</button>
      <p>{post.detected_contents}</p>
      <p>{post.solution_contents}</p>
    </div>
  );
};

export default Post;
