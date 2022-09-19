import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SolutionsBoard.scss"

const SolutionsBoard = () => {
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
      console.log("Img List ON screen");
      try {
        const res = await axios.get("http://127.0.0.1:8000/post/solutions", {
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
    fetchData();
  }, []);

  return (
    <>
      <div className="Solution-title">
            <p><b>게시판</b></p>
          </div>
          <div className="Solution-contents">
            <p>다른 사용자들과 함께 소통을 해보세요.</p>
            <p>자신의 경험과 노하우를 공유해 보세요.</p>
          </div>
      <div className="mySolutions">
        {/* <h1>My Solution lists</h1> */}
        {solutionList.filter(data => data.id !== null).map((data)=>{
                return (
                    <div className='list' key={data.id}>
                        <img src={data.detected_image} width='300' height='200'/>
                        <img src={data.solution_image} width='300' height='200'/>
                        <hr/>
                    </div>
                );
            })}
      </div>
    </>
  );
};

export default SolutionsBoard;
