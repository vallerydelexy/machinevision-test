import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import Pagination from "../components/Pagination";
import { useEffect } from "react";
import Searchbar from "../components/Searchbar";
import { postsDataAtom } from "../recoil/atom/postsDataAtom";


export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useRecoilState(postsDataAtom);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPage, setTotalPage] = useState(undefined);
  const [postPerPage, setPostPerPage] = useState(searchParams.get('limit')??10);
  const [page, setPage] = useState(searchParams.get('page')??0);
  const [created, setCreated] = useState(searchParams.get('created')??1);

  
  useEffect(()=>{
    async function getData(endpoint) {
        const apiUrl = "https://dummyapi.io/data/v1/";
        
        setPage(searchParams.get('page')??page)
        setCreated(searchParams.get('created')??created)
        setPostPerPage(searchParams.get('limit')??postPerPage)
    
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
    
        if (!posts || currentPage != searchParams.get('page')) {
          axios
            .get(apiUrl + endpoint, axiosConfig)
            .then((res) => {
              setPosts(res.data);
              setCurrentPage(res.data.page);
              setTotalPage(res.data.total);
            })
            .catch((err) => console.log(err));
        }
      }
      getData("post");

        setSearchParams({limit: postPerPage,
            page,
            created})
    
  }, [posts,searchParams, setSearchParams, postPerPage, page, created])
  return (
    <div>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Searchbar />
          <div className="gap-4 flex flex-wrap">
            {posts?.data?.map((post) => {
              return (
                <div
                  className="shadow-md border rounded-lg md:w-48 bg-gray-100 pb-3 overflow-hidden"
                  key={post.id}
                >
                  <img
                    src={post?.image}
                    className="object-cover md:h-48 md:w-48"
                  />

                  {/* <img src={post?.owner?.picture} className="object-cover h-6 w-6 rounded-full"  /> */}
                  <div className="p-3 text-sm">
                    <p className="font-bold">{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</p>
                    <p className="break-words">{post?.text}</p>
                    <p className="pt-2 text-gray-600 font-bold flex gap-2">
                        {post?.tags?.map((tag)=>{
                            return `#${tag} `
                        })}
                    </p>
                    {console.log(post)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Pagination page={page} currentPage={currentPage} totalPage={totalPage} />
    </div>
  );
}
