import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const MheModal = ({ open, handleOpen, data }) => {
  return (
    <Dialog
      open={open}
      onClose={handleOpen}
      style={{ 
        maxWidth: 'none', 
        width: '100%', 
        height: '100%', 
        background: 'white', 
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column' 
      }}
    >
     <DialogHeader 
  className="bg-[red] text-white text-2xl font-black flex justify-between items-center h-[7%]"
>
  <div className="flex items-center">
    <img src="/img/logo1.jpg" alt="Logo" className="mr-4 h-[40px]" />
  </div>
  
  <div className="absolute left-1/2 transform -translate-x-1/2">
    QUY CÁCH SẢN PHẨM
  </div>
</DialogHeader>
      <DialogBody 
        style={{ 
          padding: '1rem'
        }}
      >
        {data ? (
          <div className="overflow-x-auto bg-[#BFEFFF]">
            <div className="">
            <table className="border-collapse border border-black w-full">
              <thead>
                <tr className="bg-[#e7e6e6]">
                  <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[20%]">Công Đoạn</th>
                  <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[15%]">Mã Hàng</th>
                  <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[15%]">Loại Lõi Thép</th>
                  <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[30%]">Tên Sản Phẩm</th>  
                  <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[20%]">Số Sợi (±0)</th>   
                  
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">MHE-Stellcord</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.mahang}</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.quycachloithep}</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.name}</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.sosoi}</td>   
                </tr>
              </tbody>
            </table>
            <div className="mt-9">
              <table className="border-collapse border border-black w-full">
                <thead>
                  <tr className="bg-[#e7e6e6]">
                    <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[20%]">Pitch</th>
                    <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[15%]">Độ dày<br/>(±0.3mm)</th>
                    <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[15%]">Số Dây Cắt Được</th>
                    <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[30%]">Tốc Độ Máy Đùn (±50)</th>
                    <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[20%]">Tốc Độ Kéo (±50)</th>
                  </tr>
                  <tr className="bg-[#c1e5f3]">
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.pitch}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.doday}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.sodaycatduoc}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.tocdomaydun}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.tocdokeo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-9">
              <table className="border-collapse border border-black w-full">
                <thead>
                  <tr className="bg-[#e7e6e6]">
                    <th colSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[20%]">Số Khuôn</th>
                    <th colSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[30%]">Khổ<br/>(+5,-2mm)</th>
                    <th colSpan="2" className="border border-black p-2 text-base font-semibold text-black w-[30%]">Chiều dài tiêu chuẩn lõi thép<br/>(±3mm)</th>
                    <th colSpan="2" className="border border-black p-2 text-base font-semibold text-black">Chiều dài trước khi cắt</th>
                  </tr>
                  <tr className="bg-[#ddeafa]">
                  <th className="border border-black p-2 text-base font-semibold text-black">Khuôn Die</th>
                  <th className="border border-black p-2 text-base font-semibold text-black">Khuôn lỗ</th>
                  <th className="border border-black p-2 text-base font-semibold text-black">Tiêu Chuẩn</th>
                  <th className="border border-black p-2 text-base font-semibold text-black">Thực Tế</th>
                    <th className="border border-black p-2 text-base font-semibold text-black">Sợi 1÷3</th>
                    <th className="border border-black p-2 text-base font-semibold text-black">Sợi 2÷4</th>
                    <th className="border border-black p-2 text-base font-semibold text-black">Lớn</th>
                    <th className="border border-black p-2 text-base font-semibold text-black">Nhỏ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.khuonlodie}</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.khuonsoiholder}</td>
                  <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.tieuchuan}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.thucte}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.soi1}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.soi2}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.chieudaicatlon}</td>
                    <td className="border text-xl border-black p-2 text-[#3f51b5] font-extrabold text-center align-middle">{data.chieudaicatnho}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
          
        ) : (
          <p>No data available</p>
        )}
      </DialogBody>
      <div className="text-right pr-4">
              <Button className="w-[100px] ml-4 bg-[red]" color="blue" onClick={handleOpen}>
                <span className="text-base text-[white]">Đóng</span>
              </Button>
              </div>
    </Dialog>
  );
};

export default MheModal;
