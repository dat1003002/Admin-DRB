// MheModal.js
import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";


const MheModal = ({ open, handleOpen, data }) => {
  return (
    <Dialog open={open} onClose={handleOpen} style={{ maxWidth: 'none', width: '100%', height:'100%', background:'white',  borderRadius: '0px'}}>
      <DialogHeader className="bg-[red] text-white text-4xl font-black flex justify-between items-center h-[9%]">
  <div className="flex items-center">
    <img src="/img/logo1.jpg" alt="Logo" className="mr-4" />
  </div>
  <div className="flex-grow flex justify-center">
    QUY CÁCH SẢN PHẨM
  </div>
  <div className="flex items-center" style={{ visibility: 'hidden' }}>
    <img src="/img/logo1.jpg" alt="Placeholder" />
  </div>
</DialogHeader>

      <DialogBody>
        {data ? (
          <table className="border-collapse border border-black w-full">
            <thead>
              <tr className="bg-[#e7e6e6]">
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Mã Hàng</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Tên Sản Phẩm</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Loại Lõi Thép</th>
                <th colspan="2" className="border border-black p-2 text-base font-semibold text-black">Số Khuôn</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Số Sợi (±0)</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Pitch</th>
                <th colspan="2" className="border border-black p-2 text-base font-semibold text-black">Khổ<br/>(+5,-2mm)</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Độ dày<br/>(±0.3mm)</th>
                <th colspan="2" className="border border-black p-2 text-base font-semibold text-black">Chiều dài tiêu chuẩn lõi thép<br/>(±3mm)</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Số Dây Cắt Được</th>
                <th colspan="2" className="border border-black p-2 text-base font-semibold text-black">Chiều dài trước khi cắt</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Tốc Độ Máy Đùn (±50)</th>
                <th rowSpan="2" className="border border-black p-2 text-base font-semibold text-black">Tốc Độ Kéo (±50)</th>
              </tr>
              <tr className="bg-[#e7e6e6]">
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
              
              <tr>
                <td className="border border-black p-2 text-[red] font-extrabold text-center">{data.mahang}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-base text-center">{data.name}</td>
                <td className="border border-black p-2 text-[rgb(255,0,0)] font-extrabold text-xl text-center">{data.quycachloithep}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.khuonlodie}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.khuonsoiholder}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.sosoi}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.pitch}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.tieuchuan}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.thucte}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.doday}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.soi1}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.soi2}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.sodaycatduoc}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.chieudaicatlon}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.chieudaicatnho}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.tocdomaydun}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl text-center">{data.tocdokeo}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
        <div className="flex justify-end pt-3">
         
        </div>
        
      </DialogBody>
      <DialogFooter>
         <Button className="bg-[red] w-[100px]" color="black" onClick={handleOpen}>
          <span className="text-base">Đóng</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MheModal;
