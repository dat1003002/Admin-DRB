import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import axios from 'axios';

const EditMhe = ({ open, handleOpen, item }) => {
    const [formValues, setFormValues] = useState({
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
        tocdokeo: "",
    });

    useEffect(() => {
        if (item) {
            setFormValues({
                mahang: item.mahang || "",
                name: item.name || "",
                quycachloithep: item.quycachloithep || "",
                khuonlodie: item.khuonlodie || "",
                khuonsoiholder: item.khuonsoiholder || "",
                sosoi: item.sosoi || "",
                pitch: item.pitch || "",
                tieuchuan: item.tieuchuan || "",
                thucte: item.thucte || "",
                doday: item.doday || "",
                soi1: item.soi1 || "",
                soi2: item.soi2 || "",
                sodaycatduoc: item.sodaycatduoc || "",
                chieudaicatlon: item.chieudaicatlon || "",
                chieudaicatnho: item.chieudaicatnho || "",
                tocdomaydun: item.tocdomaydun || "",
                tocdokeo: item.tocdokeo || "",
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/data/${item.id}`, formValues)
            .then(response => {
                handleOpen();
            })
            .catch(error => {
                console.error("Error updating data:", error);
            });
    };

    return (
        <Dialog open={open} handler={handleOpen} style={{ maxWidth: 'none', width: '55%' }}>
            <DialogHeader className="flex justify-center bg-red-500 text-white">CHỈNH SỬA QUY CÁCH</DialogHeader>
            <DialogBody>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <div>
                            <div className="flex justify-between">
                                <label className="text-black font-medium text-base">Mã Quy Cách:</label>
                                <input type="text" name="mahang" value={formValues.mahang} onChange={handleInputChange} className="border border-black ml-5 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex mt-4 justify-between">
                                <label className="text-black font-medium text-base">Tên Quy Cách:</label>
                                <input type="text" name="name" value={formValues.name} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex mt-4 justify-between">
                                <label className="text-black font-medium text-base">Quy Cách Lõi Thép:</label>
                                <input type="text" name="quycachloithep" value={formValues.quycachloithep} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="mt-4 border border-black pb-4">
                                <label className="flex justify-center text-black font-medium text-base">Số Khuôn:</label>
                                <div className="flex justify-around">
                                    <label className="text-black font-medium text-base">Khuôn Lỗ Die</label>
                                    <label className="text-black font-medium text-base">Khuôn Sợi Holder</label>
                                </div>
                                <div className="flex justify-around">
                                    <input type="text" name="khuonlodie" value={formValues.khuonlodie} onChange={handleInputChange} className="border border-black text-black pl-1" />
                                    <input type="text" name="khuonsoiholder" value={formValues.khuonsoiholder} onChange={handleInputChange} className="border border-black text-black pl-1" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Số Sợi (±0):</label>
                                <input type="text" name="sosoi" value={formValues.sosoi} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Pitch:</label>
                                <input type="text" name="pitch" value={formValues.pitch} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="mt-4 border border-black pb-4">
                                <label className="flex justify-center text-black font-medium text-base">Khổ (+5,-2mm):</label>
                                <div className="flex justify-around">
                                    <label className="text-black font-medium text-base">Tiêu Chuẩn</label>
                                    <label className="text-black font-medium text-base">Thực Tế</label>
                                </div>
                                <div className="flex justify-around">
                                    <input type="text" name="tieuchuan" value={formValues.tieuchuan} onChange={handleInputChange} className="border border-black pl-1" />
                                    <input type="text" name="thucte" value={formValues.thucte} onChange={handleInputChange} className="border border-black pl-1" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label className="text-black font-medium text-base">Độ dày(≠ 0.3mm):</label>
                                <input type="text" name="doday" value={formValues.doday} onChange={handleInputChange} className="border border-black ml-3 w-[300px] text-black pl-1" />
                            </div>
                            <div className="mt-4 border border-black pb-4">
                                <label className="flex justify-center text-black font-medium text-base">Chiều Dài Tiêu Chuẩn Lõi Thép (±3mm):</label>
                                <div className="flex justify-around">
                                    <label className="text-black font-medium text-base mt-2">Sợi 1 - 3</label>
                                    <label className="text-black font-medium text-base mt-2">Sợi 2 - 4</label>
                                </div>
                                <div className="flex justify-around">
                                    <input type="text" name="soi1" value={formValues.soi1} onChange={handleInputChange} className="border border-black text-black w-[200px] pl-1" />
                                    <input type="text" name="soi2" value={formValues.soi2} onChange={handleInputChange} className="border border-black text-black w-[200px] pl-1" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Sợi (±0.1):</label>
                                <input type="text" name="sodaycatduoc" value={formValues.sodaycatduoc} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Chiều Dài Cắt Lớn:</label>
                                <input type="text" name="chieudaicatlon" value={formValues.chieudaicatlon} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Chiều Dài Cắt Nhỏ:</label>
                                <input type="text" name="chieudaicatnho" value={formValues.chieudaicatnho} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Tốc Độ Máy Dựng:</label>
                                <input type="text" name="tocdomaydun" value={formValues.tocdomaydun} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                            <div className="flex justify-between mt-4">
                                <label className="text-black font-medium text-base">Tốc Độ Kéo:</label>
                                <input type="text" name="tocdokeo" value={formValues.tocdokeo} onChange={handleInputChange} className="border border-black ml-9 w-[300px] text-black pl-1" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button color="gray" buttonType="outline" onClick={handleOpen} iconOnly ripple="dark" className="border-0 bg-[red] flex mr-3 items-center">
                            Đóng
                        </Button>
                        <Button type="submit" color="blue" buttonType="filled" size="regular" rounded block ripple="light" className="border-0 bg-[#0e8ecc] flex">
                            Lưu
                        </Button>
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
            </DialogFooter>
        </Dialog>
    );
};

export default EditMhe;
