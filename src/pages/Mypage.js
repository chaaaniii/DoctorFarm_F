import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mypage.css"
import Pagination from "../components/pagination";

const Mypage = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(11);
  const offset = (page - 1) * limit;
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
        const res = await axios.get("http://localhost:8000/accounts/user", {
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
        const res = await axios.get("http://localhost:8000/post/mypage", {
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
      <div className="User_imform">
        <ul>
          <li>User Email : {user}</li>
          <li>User pk : {userId}</li>
          <li>User Point : { }</li>
          <li></li>
        </ul>
      </div>
      <div className="mySolutions">
        <h1>My Solution lists</h1>
        {solutionList.slice(offset, offset + limit).filter(data => data.id !== null).map((data) => {
          return (
            <div className='list' key={data.id} onClick={() => updateHandler(data.id)}>
              <div>{ }</div>
              <img src={data.detected_image} width='300' height='200' />
              <img src={data.solution_image} width='300' height='200' />
              <hr />
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
