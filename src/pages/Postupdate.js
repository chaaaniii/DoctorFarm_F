import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import defaultimg from "../components/img/default.png"
import { useNavigate } from "react-router-dom";
import "./Postupdate.scss"

const PostUpdate = () => {
  const { state } = useLocation();
  const [detected_image, setDetected_image] = useState(null);
  const [detected_default_solution, setDetected_default_solution] = useState(null);
  const [detected_contents, setDetected_contents] = useState(null)
  const [solution_image, setSolution_image] = useState(null);
  const [preview_image, setPreview_image] = useState(null);
  const [solution_content, setSolution_content] = useState();
  const [detected_class, setDetected_class] = useState();
  const navigate = useNavigate()
  let [symptom, setSymptom] = useState(null);
  let [dsolution, setDsolution] = useState(null);

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

  const saveSolutionImage = (e) => {
    setPreview_image(URL.createObjectURL(e.target.files[0]));
    setSolution_image(e.target.files[0])
    console.log(e.target.files[0])
    console.log(typeof (e.target.files[0]))
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
    // detected_contents,
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
      formdata.append("detected_class", detected_class);
      formdata.append("detected_default_solution", detected_default_solution);
      formdata.append("detected_contents", detected_contents);
      { solution_image && (formdata.append('solution_image', solution_image)) };
      formdata.append("solution_contents", post.solution_contents);
      formdata.append("is_public", post.is_public);
      axios.put(`http://211.184.190.112:8000/post/mypage/${state}`, formdata, {
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
      formdata.append("detected_class", detected_class);
      formdata.append("detected_default_solution", detected_default_solution);
      { solution_image && (formdata.append('solution_image', solution_image)) };
      formdata.append("detected_contents", detected_contents);
      formdata.append("solution_contents", post.solution_contents);
      formdata.append("is_public", true);
      axios.put(`http://211.184.190.112:8000/post/mypage/${state}`, formdata, {
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
        console.log('state', state);
        const res = await axios.get(
          `http://211.184.190.112:8000/post/mypage/${state}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        const _data = res.data
        console.log(_data["detected_class"])
        setDetected_image(_data['detected_image']);
        setDetected_class(_data['detected_class']);
        setDetected_default_solution(_data['detected_default_solution']);
        setDetected_contents(_data['detected_contents'])
        setPreview_image(_data['solution_image']);
        setSolution_content(_data['solution_contents'])
        setCode_anwser(dicObject[_data['detected_class']])
        setPost({
          ...post,
          solution_contents: _data['solution_contents'],
        });
        if (_data['solution_image'] != null) {
          let url = _data['solution_image']
          const response = await fetch(url);
          const data = await response.blob();
          const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
          const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
          const metadata = { type: `image/${ext}` };
          var file = new File([data], filename, metadata);
          setSolution_image(file);
        }

        axios
          .get(
            `http://211.184.190.112:8000/solutions/${_data['detected_class']}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          )
          .then(function (res) {
            setSymptom(res.data.symptom);
            setDsolution(res.data.solution_default);
            console.log(dsolution)
          })



        // setPost(_data['solution_contents']);

        console.log(typeof (solution_contents))
        console.log(detected_default_solution)

      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="Postupdate-title">
        <p><b>수정 페이지</b></p>
      </div>
      <div className="Postupdate-contents">
        <p>진단받은 농작물의 개선된 이미지를 업로드하여</p>
        <p>다른 사용자들에게 노하우를 공유하고 포인트도 챙겨보세요!</p>
      </div>
      <div className="D_body">
        <img className="DS_img1" src={detected_image} width="300" height="200" />
        <span className="D_solution">
          <p className="pu-title" ><b>💥{code_anwser}💥</b></p>
          <p className="pu-symptom" >{symptom}</p>
          <div className="pu-solution" >
            <p><b>⭐해결방안⭐</b></p>
            <p>{dsolution}</p>
          </div>
        </span>
        <br />
        <p />
      </div>
      <div>
        {/* <input type='file' accept='img/*' onChange={(e)=>setSolution_image(e.target.files[0])}></input> */}
        <p className="upload-img-guide">개선된 이미지를 업로드 해주세요.</p>
        <div>
          {solution_image ? <img className="DS_img2" src={preview_image} alt="" width="300" heigh="200" /> : <img className="DS_img2" src={defaultimg} />}
        </div>
        <input className="pv_input" type='file' accept='img/*' onChange={saveSolutionImage}></input>
        <br />
        <span className="S_solution">
          <textarea
            className="textarea"
            name="solution_contents"
            placeholder="solution_contents"
            onChange={onChange}
            defaultValue={solution_content}
          />

        </span>
        <br />
        <p></p>
        <button className="Postupdate-button" onClick={onClickTempHandler}>임시저장</button>
        <button className="Postupdate-button" onClick={onClickTempHandler1}>게시하기</button>

      </div>
    </>
  );
};

export default PostUpdate;