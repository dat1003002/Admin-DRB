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
                <th className="border border-black p-2 text-base font-semibold text-black">Mã Hàng</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Tên Sản Phẩm</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Quy Cách Lõi Thép</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Khuân Lỗ Đie</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Khuân Sợi Holder</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Số Sợi (±0)</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Pitch</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Tiêu Chuẩn</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Thực Tế</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Độ Dày (≠ 0.3mm)</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Sợi 1 - 3</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Sợi 2 - 4</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Số Dây Cắt Được</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Chiều Dài Cắt Lớn</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Chiều Dài Cắt Nhỏ</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Tốc Độ Máy Đùn (≠50)</th>
                <th className="border border-black p-2 text-base font-semibold text-black">Tốc Độ Kéo (≠50)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 text-[red] font-extrabold">{data.mahang}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-base">{data.name}</td>
                <td className="border border-black p-2 text-[rgb(255,0,0)] font-extrabold text-xl">{data.quycachloithep}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.khuonlodie}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.khuonsoiholder}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.sosoi}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.pitch}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.tieuchuan}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.thucte}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.doday}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.soi1}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.soi2}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.sodaycatduoc}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.chieudaicatlon}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.chieudaicatnho}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.tocdomaydun}</td>
                <td className="border border-black p-2 text-[red] font-extrabold text-xl">{data.tocdokeo}</td>
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
