import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { BookmarkSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const AddMhe = ({ open, handleOpen }) => {
    const initialFormData = {
        mahang: "",
        name: "",
        quycachloithep: "",
        khuonlodie: "",
        khuonsoiholder: "",
        sosoi: "",
        pitch: "",
        tieuchuan: "",
        thucte: "",
        doday: "",
        soi1: "",
        soi2: "",
        sodaycatduoc: "",
        chieudaicatlon: "",
        chieudaicatnho: "",
        tocdomaydun: "",
        tocdokeo: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        if (!formData.mahang || !formData.name || !formData.quycachloithep) {
            alert("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }
        axios.post("http://localhost:5000/api/data", formData)
            .then(response => {
                setFormData(initialFormData);
                handleOpen();
                alert("Dữ liệu được thêm thành công!");
            })
            .catch(error => {
                console.error("Lỗi khi lưu dữ liệu:", error);
                alert("Đã xảy ra lỗi khi thêm dữ liệu.");
            });
    };

    return (
        <Dialog open={open} handler={handleOpen} style={{ maxWidth: 'none', width: '55%' }}>
            <DialogHeader className="flex justify-center bg-[red] text-white">Thêm Quy Cách Mới</DialogHeader>
            <DialogBody>
                <div className="">
                    <form>
                        <div className="flex justify-between">
                            <div className="">
                                <div className="flex justify-between">
                                    <label className="text-black font-medium text-base">Mã Quy Cách:</label>
                                    <input type="text" name="mahang" value={formData.mahang} onChange={handleChange} className="border border-black ml-5 w-[300px] text-black pl-1" />
                                </div>
                                <div className="flex mt-4 justify-between">
                                    <label className="text-black font-medium text-base">Tên Quy Cách:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                                </div>
                                <div className="flex mt-4 justify-between">
                                    <label className="text-black font-medium text-base">Quy Cách Lõi Thép:</label>
                                    <input type="text" name="quycachloithep" value={formData.quycachloithep} onChange={handleChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                                </div>
                                <div className="mt-4 border border-black pb-4">
                                    <label className="flex justify-center text-black font-medium text-base">Số Khuôn:</label>
                                    <div className="flex justify-around">
                                        <label className="text-black font-medium text-base">Khuôn Lỗ Die</label>
                                        <label className="text-black font-medium text-base">Khuôn Sợi Holder</label>
                                    </div>
                                    <div className="flex justify-around">
                                        <input type="text" name="khuonlodie" value={formData.khuonlodie} onChange={handleChange} className="border border-black text-black pl-1" />
                                        <input type="text" name="khuonsoiholder" value={formData.khuonsoiholder} onChange={handleChange} className="border border-black text-black pl-1" />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <label className="text-black font-medium text-base">Số Sợi (±0):</label>
                                    <input type="text" name="sosoi" value={formData.sosoi} onChange={handleChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <label className="text-black font-medium text-base">Pitch:</label>
                                    <input type="text" name="pitch" value={formData.pitch} onChange={handleChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                                </div>
                                <div className="mt-4 border border-black pb-4">
                                    <label className="flex justify-center text-black font-medium text-base">Khổ (+5,-2mm):</label>
                                    <div className="flex justify-around">
                                        <label className="text-black font-medium text-base">Tiêu Chuẩn</label>
                                        <label className="text-black font-medium text-base">Thực Tế</label>
                                    </div>
                                    <div className="flex justify-around">
                                        <input type="text" name="tieuchuan" value={formData.tieuchuan} onChange={handleChange} className="border border-black pl-1" />
                                        <input type="text" name="thucte" value={formData.thucte} onChange={handleChange} className="border border-black pl-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <label className="text-black font-medium text-base">Độ dày(≠ 0.3mm):</label>
                                    <input type="text" name="doday" value={formData.doday} onChange={handleChange} className="border border-black ml-3 w-[300px] text-black pl-1" />
                                </div>
                                <div className="mt-4 border border-black pb-4">
                                    <label className="flex justify-center text-black font-medium text-base">Chiều Dài Tiêu Chuẩn Lõi Thép (±3mm):</label>
                                    <div className="flex justify-around">
                                        <label className="text-black font-medium text-base mt-2">Sợi 1 - 3</label>
                                        <label className="text-black font-medium text-base mt-2">Sợi 2 - 4</label>
                                    </div>
                                    <div className="flex justify-around">
                                        <input type="text" name="soi1" value={formData.soi1} onChange={handleChange} className="border border-black text-black w-[200px] pl-1" />
                                        <input type="text" name="soi2" value={formData.soi2} onChange={handleChange} className="border border-black text-black w-[200px] pl-1" />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <label className="text-black font-medium text-base">Số Dây Cắt Được:</label>
                                    <input type="text" name="sodaycatduoc" value={formData.sodaycatduoc} onChange={handleChange} className="border border-black ml-1 w-[300px] text-black pl-1" />
                                </div>
                                <div className="mt-4 border border-black pb-4">
                                    <label className="flex justify-center text-black font-medium text-base">Chiều Dài Trước Khi Cắt:</label>
                                    <div className="flex justify-around">
                                        <label className="text-black font-medium text-base mt-2 pl-1">Lớn</label>
                                        <label className="text-black font-medium text-base mt-2 pl-2">Nhỏ</label>
                                    </div>
                                    <div className="flex justify-around">
                                        <input type="text" name="chieudaicatlon" value={formData.chieudaicatlon} onChange={handleChange} className="border border-black text-black w-[200px] pl-1" />
                                        <input type="text" name="chieudaicatnho" value={formData.chieudaicatnho} onChange={handleChange} className="border border-black text-black w-[200px] pl-1" />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <label className="text-black font-medium text-base">Tốc độ máy đùn(≠50):</label>
                                    <input type="text" name="tocdomaydun" value={formData.tocdomaydun} onChange={handleChange} className="border border-black ml-1 w-[300px] text-black pl-1" />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <label className="text-black font-medium text-base">Tốc độ Kéo(≠50):</label>
                                    <input type="text" name="tocdokeo" value={formData.tocdokeo} onChange={handleChange} className="border border-black ml-1 w-[300px] text-black pl-1" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="gradient" color="blue" className="mr-3 flex w-[90px] justify-around items-center text-black" onClick={handleSave}>
                    <BookmarkSquareIcon className="w-[200px]" />
                    Lưu
                </Button>
                <Button variant="gradient" color="red" className="flex w-[100px] justify-around items-center text-black" onClick={handleOpen}>
                    <XCircleIcon />
                    <span>Đóng</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default AddMhe;
