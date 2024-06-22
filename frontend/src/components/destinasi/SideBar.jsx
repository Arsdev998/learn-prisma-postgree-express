import React from "react";

const SideBar = () => {
  return (
    <div className="w-300px rounded-md">
      <div className="bg-orange-600 p-5 h-300px font-semibold">
        <h2 className="text-white mb-2">Filter Untuk Pencarian Spesifik</h2>
        <div className="p-2 bg-white font-semibold">
          Cari Berdasarkan Daerah yang ingin kamu kunjungi
        </div>
      </div>
    </div>
  );
};

export default SideBar;
