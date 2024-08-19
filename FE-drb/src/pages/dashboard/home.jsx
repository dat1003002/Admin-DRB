import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS file
import AddMhe from "./ModalMHE/addmhe";
import MheModal from "./ModalMHE";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import EditMhe from "./ModalMHE/Editmhe";

function Home() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userRole, setUserRole] = useState(""); // Thêm state để lưu trữ vai trò của người dùng

  useEffect(() => {
    fetchData();
    const role = localStorage.getItem('userRole'); // Lấy vai trò của người dùng từ localStorage
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setData(allData);
    } else {
      const filteredData = allData.filter(item =>
        item.mahang.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  }, [searchTerm, allData]);

  useEffect(() => {
    const fetchDataForPage = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setData(allData.slice(startIndex, endIndex));
    };

    fetchDataForPage();
  }, [currentPage, allData, itemsPerPage]);

  const fetchData = () => {
    axios.get('http://192.168.3.148:5000/data')
      .then(response => {
        setAllData(response.data);
        setCurrentPage(1);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleSave = (formData) => {
    axios.post("http://192.168.3.148:5000/api/data", formData)
      .then(response => {
        fetchData();
        setOpenAddDialog(false);
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  };

  const handleDelete = (id) => {
    confirmAlert({
      message: 'Bạn có chắc chắn muốn xóa không ?',
      buttons: [
        {
          label: 'Xóa',
          onClick: () => {
            axios.delete(`http://192.168.3.148:5000/api/data/${id}`)
              .then(response => {
                fetchData();
              })
              .catch(error => {
                console.error("Error deleting data:", error);
              });
          }
        },
        {
          label: 'Đóng',
          onClick: () => {}
        }
      ]
    });
  };

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage === 1) {
      endPage = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      startPage = Math.max(totalPages - 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleEdit = (id) => {
        setEditItemId(id);
        console.log("Kiểm tra id",id);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditItemId(null)
    };

  return (
    <>
      <div className="flex mt-4">
        <div className="flex">
          <Button className="bg-[#2196f3]" onClick={() => setOpenAddDialog(true)} disabled={userRole === "user"}>Thêm Mới</Button>
        </div>
        <div className="ml-auto md:mr-4 md:w-72">
          <Input 
            label="Tìm kiếm mã hàng hoặc tên sản phẩm" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader className="mb-8 p-6 bg-[#f14141]">
            <Typography variant="h6" color="white">
              Danh Sách Mã Sản Phẩm MHE
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr className="text-base">
                  {["MÃ HÀNG", "TÊN SẢN PHẨM", "CHỨC NĂNG"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left  text-[black]"
                    >
                      <Typography
                        variant="small"
                        className="text-[black] font-semibold"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => {
                  const className = `py-3 px-5 ${
                    key === data.length - 1 ? "" : "border-b border-blue-gray-50 "
                  }`;

                  return (
                    <tr className="" key={item.mahang}>
                      <td className={className}>
                        <div className="flex items-center gap-3 text-xl">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {item.mahang}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold"
                          color="blue-gray"
                           variant="small"
                        >
                          {item.name}
                        </Typography>
                      </td>
                      <td className={className}>   
                        <div className="flex items-center">
                          <Button
                            onClick={() => handleOpenModal(item)}
                            className="bg-transparent flex items-center justify-center p-2"
                          >
                            <EyeIcon className="text-black w-[15px]" />
                          </Button>
                          <Button
                           className="bg-transparent flex items-center justify-center p-2"
                           disabled={userRole === "user"}
                           onClick={() => handleEdit(item)}
                           >
                            <PencilSquareIcon className="text-[blue] w-[15px]"/>
                          </Button>
                          <Button
                            className="bg-transparent flex items-center justify-center p-2"
                            onClick={() => handleDelete(item.id)}
                            disabled={userRole === "user"}
                          >
                            <TrashIcon className="text-[#c00000] w-[15px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 flex justify-end ">
        <Button className="rounded-none text-white" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Trước
        </Button>
        {renderPageNumbers().map(page => (
          <Button
            key={page}
            className={`rounded-none bg-white border border-black text-black ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button className="rounded-none" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Sau
        </Button>
      </div>

      {selectedItem && (
        <MheModal open={!!selectedItem} data={selectedItem} handleOpen={handleCloseModal} />
      )}

      <AddMhe open={openAddDialog} handleOpen={() => setOpenAddDialog(false)} handleSave={handleSave} />
      <EditMhe open={editModalOpen} handleOpen={handleCloseEditModal} item={editItemId} />
    </>
  );
}

export default Home;
