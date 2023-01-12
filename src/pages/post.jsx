import DisplayTablePost from "../components/displayTablePost";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showFormAtom, formDataAtom, userIDAtom } from "../recoil/atom/createEditUserAtom";
import { postsDataAtom } from "../recoil/atom/postsDataAtom";
import { usersDataAtom } from "../recoil/atom/usersDataAtom";

export default function Post() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useRecoilState(postsDataAtom);
  const [users, setUsers] = useRecoilState(usersDataAtom);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPage, setTotalPage] = useState(undefined);
  const [postPerPage, setPostPerPage] = useState(
    searchParams.get("limit") ?? 10
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 0);
  const [created, setCreated] = useState(searchParams.get("created") ?? 1);
  const [openForm, setOpenForm] = useRecoilState(showFormAtom);
  const [userId, setUserId] = useRecoilState(userIDAtom);
  const [formData, setFormData] = useRecoilState(formDataAtom)

  async function createPost(){
    setUserId(null)
    setFormData({})
    setOpenForm(true)
  }

  async function getData(endpoint) {
    const apiUrl = "https://dummyapi.io/data/v1/";
    setPage(searchParams.get("page") ?? page);
    setCreated(searchParams.get("created") ?? created);
    setPostPerPage(searchParams.get("limit") ?? postPerPage);

    const axiosConfig = {
      params: {
        limit: postPerPage,
        page: page,
        created: created,
      },
      headers: {
        "app-id": import.meta.env.VITE_APP_ID,
      },
    };

    if (!posts || currentPage != searchParams.get("page")) {
      axios
        .get(apiUrl + endpoint, axiosConfig)
        .then((res) => {
          if(endpoint="post"){setPosts(res.data)};
          if(endpoint="user"){setUsers(res.data)};
          setCurrentPage(res.data.page);
          setTotalPage(res.data.total);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {getData("post") }, [posts]);
  useEffect(() => {getData("user") }, [users]);
  useEffect(() => {
    setSearchParams({ limit: postPerPage, page, created });
  }, [searchParams, postPerPage, page, created]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-6">
      <div className="py-4">
        <button
        onClick={()=>{createPost()}}
         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Post
        </button>
      </div>
      <DisplayTablePost posts={posts} />
    </div>
  );
}
