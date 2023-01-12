import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  previewImageStateAtom,
  previewImageSourceAtom,
} from "../recoil/atom/previewImageAtom";
import CreateEditPost from "./createEditPost";
import PreviewImage from "./PreviewImage";
import { showFormAtom, formDataAtom, userIDAtom } from "../recoil/atom/createEditUserAtom";
import DeleteData from "./deleteData";
import { deleteDataAtom, deleteDataIdAtom, deleteDataTypeAtom } from '../recoil/atom/deleteDataAtom';


export default function DisplayTablePost(posts) {
  const users = posts?.posts?.data;
  const [previewImageSource, setPreviewImageSource] = useRecoilState(
    previewImageSourceAtom
  );
  const [previewImageState, setPreviewImageState] = useRecoilState(
    previewImageStateAtom
  );
  const [openForm, setOpenForm] = useRecoilState(showFormAtom);
  const [formData, setFormData] = useRecoilState(formDataAtom)
  const [userId, setUserId] = useRecoilState(userIDAtom);
  const [idToDelete, setIdToDelete] = useRecoilState(deleteDataIdAtom)
  const [deleteModalState, setDeleteModalState] = useRecoilState(deleteDataAtom)
  const [deleteType, setDeleteType] = useRecoilState(deleteDataTypeAtom)
  
async function editPost(user){
  setUserId(user?.id)
  setFormData({user})
  setOpenForm(true)
}

function deleteUser(uid, type){
  setIdToDelete(uid)
  setDeleteType('post')
  setDeleteModalState(true)
}

  async function openImagePreview(url) {
    setPreviewImageSource(url);
    setPreviewImageState(true);
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Text
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr key={user?.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user?.text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user?.tags?.map((tag)=>{
                        return <span key={user.id+tag}>{tag}</span>
                    })}</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          openImagePreview(user?.image);
                        }}
                      >
                        <img
                          src={user?.image}
                          className="object-cover md:h-8 md:w-8"
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {`${user?.owner?.title} ${user?.owner?.firstName} ${user?.owner?.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={()=>{editPost(user)}}
                      >
                        Edit
                      </button>

                      {" | "}

                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={()=>{deleteUser(user?.id)}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PreviewImage />
      <CreateEditPost />
      <DeleteData />
    </div>
  );
}
