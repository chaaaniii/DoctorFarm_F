import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SolutionsBoard.scss";
import Pagination from "../components/pagination";

const SolutionsBoard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const offset = (page - 1) * limit;
  let [symptom, setSymptom] = useState(null);
  let [dsolution, setDsolution] = useState(null);

  const [solutionList, setSolutionList] = useState([
    {
      id: null,
      email: null,
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

  const solutionHandler = (solutions) => {

    setSolutionList(solutionList.concat(solutions));
  }

  useEffect(() => {
    async function fetchData() {
      console.log("Img List ON screen");
      try {
        const res = await axios.get("http://211.184.190.112:8000/post/solutions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const _solutionList = await res.data.map((rowData) => ({
          id: rowData.id,
          email: rowData.email,
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
        console.log(_solutionList)
        // solutionHandler(_solutionList);
        // axios
        //   .get(
        //     `http://211.184.190.112:8000/solutions/${_solutionList.detected_class}`,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem(
        //           "token"
        //         )}`,
        //       },
        //     }
        //   )
        //   .then(function (res) {
        //     setSymptom(res.data.symptom);
        //     setDsolution(res.data.solution_default);
        //     console.log(dsolution)
        //   })


      } catch (e) {
        console.error(e.message);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://211.184.190.112:8000/post/solutions", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) =>{
  //       const _solutionList = res.data.map((rowData) => ({
  //         id: rowData.id,
  //         email: rowData.email,
  //         detected_image: rowData.detected_image,
  //         solution_image: rowData.solution_image,
  //         detected_default_solution: rowData.detected_default_solution,
  //         detected_class: rowData.detected_class,
  //         detected_contents: rowData.detected_contents,
  //         solution_contents: rowData.solution_contents,
  //         is_public: rowData.is_public,
  //         created_at: rowData.created_at,
  //       }));
  //       setSolutionList(solutionList.concat(_solutionList));
  //       console.log(_solutionList.detected_class)
  //     })
  //     .then(() => {
  //       console.log(solutionList)
  //     })
  // }, []);

  return (
    <>
      <div className="Solution-title">
        <p><b>게시판</b></p>
      </div>
      <div className="Solution-contents">
        <p>자신의 경험과 노하우를 공유해 보세요.</p>
        <p>다른 사람들의 노하우를 참고하여 건강한 농작물을 키워보세요.</p>
      </div>
      <div className="mySolutions">
        {/* <h1>My Solution lists</h1> */}
        {solutionList.slice(offset, offset + limit).filter(data => data.id !== null).map((data) => {
          return (
            <div className='list' key={data.id}>
              <div className="post-title">
                <p className="post-title__name">💥{dicObject[`${data.detected_class}`]}</p>
                <p className="post-title__writer">👨‍🌾작성자:{`${data.email}`.split('@', 1)}</p>
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

export default SolutionsBoard;
