import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

const initial = {
  name: "",
  phone: "",
  mail: "",
  dob: "",
};
export default function Form() {
  const [data, setData] = useState(false);
  const [record, setRecord] = useState([]);
  const [listData, setListData] = useState([]);
  const [inputValue, setInputValue] = useState(initial);
  const [error, setError] = useState(false);

  const handleOnChange = (event) => {
    let item = event.target.value;

    if (item.length < 3) {
      setError(true);
    } else {
      setError(false);
    }
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
    console.log("length", item.length);
  };

  const click = (e) => {
    e.preventDefault();
    const newuser = { ...inputValue };
    // console.log("newuser", newuser);
    setRecord([...record, newuser]);
    localStorage.setItem("data", JSON.stringify([...record, newuser]));
    // console.log(record);
    setInputValue(initial);
  };
  const handleOnDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const copyData = record;
        copyData.splice(id, 1);
        setRecord([...copyData]);
        localStorage.setItem("data", JSON.stringify(copyData));
        setInputValue(initial);
        setData(false);

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const deleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const copyData = record;
        copyData.splice(0);
        localStorage.setItem("data", JSON.stringify(copyData));

        setRecord([...copyData]);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const handleOnEdit = (item, index) => {
    // console.log("item", item);
    setInputValue(item);
    setListData(index);
    setData(true);
  };
  const finaledit = () => {
    const newData = { ...inputValue };
    const copyData = record;
    const data = listData;
    copyData[data] = {
      ...newData,
    };
    localStorage.setItem("data", JSON.stringify(copyData));
    setRecord(copyData);
    setData(false);
    setInputValue(initial);
    // console.log("copyData", copyData);
    console.log("🚀 ~ finaledit ~ copyData:", copyData);
  };

  return (
    <div>
      <div>
        <div className="m-3">
          <div className="text-center border p-3 ">
            <h4>
              name :-
              <input
                className="m-1"
                id="name"
                type="text"
                name="name"
                placeholder="enter your name"
                onChange={handleOnChange}
                value={inputValue.name}
              />
            </h4>
            {error ? (
              <span className="text-danger">name is not valid*</span>
            ) : (
              ""
            )}

            <h4>
              phone:-
              <input
                className=" m-1"
                type="number"
                name="phone"
                placeholder="phone number"
                onChange={handleOnChange}
                value={inputValue.phone}
              />
            </h4>
            {error ? (
              <span className="text-danger">phone is not valid*</span>
            ) : (
              ""
            )}

            <h4>
              email :-
              <input
                className=" m-1"
                type="email"
                name="mail"
                placeholder="name123@gmail.com"
                onChange={handleOnChange}
                value={inputValue.mail}
              />
            </h4>
            {error ? (
              <span className="text-danger">email is not valid*</span>
            ) : (
              ""
            )}

            <h4>
              date :-
              <input
                className=" m-1"
                type="date"
                name="dob"
                placeholder="date of birth"
                onChange={handleOnChange}
                value={inputValue.dob}
              />
            </h4>
            {error ? (
              <span className="text-danger">date is not valid*</span>
            ) : (
              ""
            )}

            <div>
              {data ? (
                <button className="btn btn-primary mt-3" onClick={finaledit}>
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-success mt-3"
                  type="submit"
                  onClick={click}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button onClick={deleteAll} className="btn btn-danger mt-2 ">
        Delete All
      </button>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>no.</th>
              <th>name</th>
              <th>phone</th>
              <th>dob</th>
              <th>mail</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {record?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.dob}</td>
                  <td>{item?.mail}</td>

                  <button
                    onClick={() => handleOnEdit(item, index)}
                    className="btn btn-outline-secondary "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleOnDelete(index)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
