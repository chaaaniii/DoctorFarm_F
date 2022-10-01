import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mypage.scss"
import Pagination from "../components/pagination";
import imagelogo from "../components/img/imageuplod.png"
import imagelogo1 from "../components/img/direction.png"
import imagelogo2 from "../components/img/update.png"
import imagelogo3 from "../components/img/point.png"

const Mypage = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const offset = (page - 1) * limit;

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

  const [solutionList, setSolutionList] = useState([
    {
      id: null,
      detected_image: null,
      solution_image: null,
      detected_default_solution: null,
      detected_class: null,
      detected_contents: null,
      solution_contents: null,
      is_public: null,
      created_at: null,
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://211.184.190.112:8000/accounts/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        const _user = await res.data;
        setUser(_user.email);
        setUserId(_user.pk);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();

    async function fetchData2() {
      console.log("Img List ON screen");
      try {
        const res = await axios.get("http://211.184.190.112:8000/post/mypage", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        const _solutionList = await res.data.map((rowData) => ({
          id: rowData.id,
          detected_image: rowData.detected_image,
          solution_image: rowData.solution_image,
          detected_default_solution: rowData.detected_default_solution,
          detected_class: rowData.detected_class,
          detected_contents: rowData.detected_contents,
          solution_contents: rowData.solution_contents,
          is_public: rowData.is_public,
          created_at: rowData.created_at,
        }));
        setSolutionList(solutionList.concat(_solutionList));
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData2();
  }, []);


  const navigate = useNavigate()

  const updateHandler = (id) => {
    console.log(id)
    navigate("/Postupdate", { state: id })
  }


  return (
    <>
      <div className="Mypage-title">
        <p><b>마이페이지</b></p>
        <p></p>
      </div>
      <div className="Mypage-contents">
        <img className="imagelogo1" src={imagelogo}></img>
        <img className="imagelogo2" src={imagelogo1}></img>
        <img className="imagelogo3" src={imagelogo2}></img>
        <img className="imagelogo4" src={imagelogo1}></img>
        <img className="imagelogo5" src={imagelogo3}></img>
        <p className="item1">진단받은 이미지 클릭<br></br>(수정페이지로 이동)</p>
        <p className="item2">개선된 이미지 로드 및 <br></br>노하우 작성</p>
        <p className="item3">게시하고 포인트 받자</p>

      </div>
      <div className="mySolutions">
        <div>
          <h2 className="title-point">My point : 💰{solutionList.length*100}p</h2>
          <h1 className="title-list">My Solution lists</h1>
        </div>
        {solutionList.slice(offset, offset + limit).filter(data => data.id !== null).map((data) => {
          return (
            <div className='list' key={data.id} onClick={() => updateHandler(data.id)}>
              <div className="post-title">
                <p className="post-title__name">💥{dicObject[`${data.detected_class}`]}</p>
              </div>
              <div className="post-contents">
                <img className="post-contents-img" src={data.detected_image} width='300' height='230' />
                <div>
                  <p className="post-contents-solution"><b>💥증상💥</b></p>
                  <textarea className="post-contents-solution__textbox" disabled>{data.detected_contents}</textarea>
                  <p className="post-contents-solution"><b>⭐해결방안⭐</b></p>
                  <textarea className="post-contents-solution__textbox" disabled>{data.detected_default_solution}</textarea>
                </div>
                <img className="post-contents__improved" src={data.solution_image} width='300' height='230' />
                <div>
                  <p className="post-contents-solution"><b>🍯꿀팁🍯</b></p>
                  <p className="post-contents-improved-contents">{data.solution_contents} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        total={solutionList.length}
        limit={limit}
        page={page}
        setPage={setPage}


      />
    </>
  );
};

export default Mypage;
