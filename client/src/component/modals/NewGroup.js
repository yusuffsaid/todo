import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal, themaState } from "../../features/themaSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { authState } from "../../features/authSlice";
import { addGroup, addGroupMember } from "../../features/groupSlice";
const NewGroup = () => {
  const { user } = useSelector(authState);
  const { members, group } = useSelector(themaState);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState([]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const searchRef = useRef();

  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      isTyping &&
        axios.get(`/api/user/search?name=${search}`).then((data) => {
          setResult(data.data.users);
          setLoading(false);
        });
    }, 300);
    return () => {
      clearTimeout(getData);
      setLoading(false);
    };
  }, [search]);

  useEffect(() => {
    if (members !== false) {
      let name = [];
      let infos = [];
      members.map((member, i) => {
        name.push(member.name);
        infos.push(member._id);
      });
      setName(name);
      setInfo(infos);
    } else {
      setName([user.name]);
      setInfo([user._id]);
    }
  }, []);

  const isTyping = search.replace(/\s+/, "").length > 0;
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };
  const onSubmitEvent = async (e) => {
    e.preventDefault();

    if (members !== false) {
      axios
        .post("/api/group/addmember/" + group, { members: [...info] })
        .then((data) => {
          dispatch(
            addGroupMember({ id: group, members: data.data.post.members })
          );
        });
    } else {
      axios
        .post("/api/group/create", {
          title,
          members: info,
          admin: user._id,
        })

        .then((data) => {
          dispatch(addGroup(data.data.group));
        });
    }

    dispatch(setModal());
  };
  return (
    <div
      style={{ height: "400px" }}
      className="w-full  mt-20  md:w-6/12 overflow-hidden bg-white flex justify-center py-6 m-1 rounded-sm shadow-2xl"
    >
      <form
        onSubmit={onSubmitEvent}
        className="w-full md:w-6/12 px-2 relative "
      >
        {!members && (
          <div>
            <p className=" inline-block text-lg">Grub adınız</p>
            {/* <small className=" py-1 text-xs ml-3 leading-none">
        {errors.title?.message}
      </small> */}
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-purple-500 focus:outline-none  p-1 rounded-sm"
            ></input>
          </div>
        )}

        {info.length > 0 && (
          <div className="flex flex-wrap my-4">
            {name.map((n, i) => (
              <div key={i} className="flex mr-2 items-center">
                <span className="w-3 h-3 block rounded-full bg-purple-300 mr-1"></span>
                <small>{n}</small>
              </div>
            ))}
          </div>
        )}
        <div>
          <p className=" inline-block text-lg">Üyeleriniz</p>
          {/* <small className=" py-1 text-xs ml-3 leading-none">
        {errors.title?.message
        }
      </small> */}
          <input
            type="search"
            className={`search w-full border-2 border-purple-500 focus:outline-none  p-1 rounded-sm`}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {isTyping && (
          <div className=" max-h-40 overflow-auto absolute left-0 w-full bg-white">
            {result.length > 0 &&
              !loading &&
              result.map((m, i) => (
                <div
                  className="py-2 px-1 cursor-pointer flex items-center hover:bg-purple-200 mx-2"
                  key={i}
                  onClick={() => {
                    if (!info.includes(m._id)) {
                      setInfo([...info, m._id]);
                      setName([...name, m.name]);
                    }
                    setResult([]);
                    setSearch("");
                    document.querySelector(".search").focus();
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={m.profil_img}
                      className="rounded-full h-10 w-10 mr-3"
                      alt={m.name}
                    ></img>
                    <div className="flex flex-col items-start">
                      <p className="leading-none">{m.name}</p>
                      <small>{m.email}</small>
                    </div>
                  </div>
                </div>
              ))}
            {/* {loading && <MyLoader />} */}
            {result.length === 0 && (
              <span className="text-center text-sm block">
                "{search}" diye biri yok
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-purple-500 py-3 text-white rounded-sm mt-4"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default NewGroup;
