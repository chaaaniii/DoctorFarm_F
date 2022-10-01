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
      formdata.append('detected_class', detected_default_solution);
      formdata.append('detected_default_solution', dsolution);
      { solution_image && (formdata.append('solution_image', solution_image)) };
      formdata.append('detected_contents', symptom);
      formdata.append('solution_contents', post.solution_contents);
      formdata.append('is_public', post.is_public);
      axios.post("http://211.184.190.112:8000/post/solutions/", formdata, {
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
        const res = await axios.get("http://211.184.190.112:8000/detected_image/", {
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
        setCode_anwser(dicObject[_img[0].class_id])
        axios
          .get(
            `http://211.184.190.112:8000/solutions/${_img[0].class_id}`,
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
      <div className="Post-title">
        <p><b>임시저장 페이지</b></p>
      </div>
      <div className="Post-contents">
        <p>진단 받은 날짜를 입력해 두시면 언제 진단 받았는지 알 수 있고, 마이페이지에서 게시글을 수정하실 수 있습니다.</p>
        <p>추후 개선 이미지를 업로드하여 다른 사용자들과 노하우를 공유하고 싶다면 임시저장 버튼을 클릭하여 마이페이지에 저장하세요!</p>
      </div>
      <div className="D_body">
        <img className="DS_img1" src={detected_image} />
        <span className="D_solution">
          <p className="pu-title" ><b>💥{code_anwser}💥</b></p>
          <p className="pu-symptom" >{symptom}</p>
          <div className="pu-solution" >
            <p><b>⭐해결방안⭐</b></p>
            <p className="pu-dsolution">{dsolution}</p>
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
            placeholder="   농작물들을 개선시키기 위해 노력하신 방법를 적어주세요!"
            onChange={onChange}
            value={solution_contents}
          />
        </span>
        <br />
        <p></p>
        <button className="Post-button" onClick={onClickTempHandler}>임시저장</button>
        {/* <button onClick={() => { }}>Public POST</button> */}
      </div>
    </>
  );
};


