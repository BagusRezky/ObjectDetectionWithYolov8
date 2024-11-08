import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TopBar from "../components/topbar/TopBar";
import "../../src/index.css";
import { IconMinus } from "@tabler/icons-react";
import FillButton from "../components/button/FillButton";

function BillboardReport() {
  const { billboardName } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/interactions/BillboardA`
        );
        setData(response.data);
        setFilteredData(response.data); // Inisialisasi dengan semua data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [billboardName]);


  // Fungsi untuk memfilter data berdasarkan tanggal
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
        return itemDate >= startDate && itemDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Jika tanggal tidak di-set, tampilkan semua data
    }
  };

  // Fungsi untuk mengunduh PDF berdasarkan data yang difilter
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(`Report for ${billboardName}`, 20, 10);

    const tableColumn = [
      "Tanggal",
      "Jumlah Kendaraan Kebawah",
      "Jumlah Kendaraan Keatas",
    ];
    const tableRows = [];

    filteredData.forEach((item) => {
      const itemData = [
        new Date(item.timestamp).toLocaleDateString(),
        item.going_down,
        item.going_up,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`report_${billboardName}.pdf`);
  };

  return (
    <div className="flex flex-col">
      <TopBar title="Detail Report" />

      <div className="safe-area-page">
        <div className="custom-card flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start md:justify-start w-full md:w-fit">
              <h3 className="font-inter-tight font-medium text-xl text-neutral-black">Billboard {billboardName}</h3>
              <div className="md:hidden">
                  <FillButton label="Download PDF" onClick={downloadPDF} />
                </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-inter-tight font-medium text-base text-neutral-black hidden md:block">Date Filter</label>
              <div className="w-full flex justify-between items-end">
                <div className="flex flex-col md:flex-row gap-3 md:items-center w-full md:w-[600px] ">
                  <div className="flex flex-col gap-2 flex-grow">
                    <label className="font-inter-tight font-medium text-base text-neutral-black md:hidden">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="items-center justify flex-grow px-4 h-11 font-inter-tight font-regular text-neutral-black rounded-lg border border-neutral-200 overflow-hidden focus-input"
                    />

                  </div>
                  <IconMinus size={20} stroke={2} color="#1b1b1b" className="hidden md:block" />
                  <div className="flex flex-col gap-2 flex-grow">
                    <label className="font-inter-tight font-medium text-base text-neutral-black md:hidden">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="items-center justify flex-grow px-4 h-11 font-inter-tight font-regular text-neutral-black rounded-lg border border-neutral-200 overflow-hidden focus-input"
                    />
                  </div>
                  <FillButton label="Filter" onClick={handleFilter} />
                </div>
                <div className="hidden md:block">
                  <FillButton label="Download PDF" onClick={downloadPDF} />
                </div>

              </div>

            </div>
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-200 h-11 items-center">
                <th className="px-3 rounded-l-[8px] w-[118px] font-inter-tight text-left font-semibold text-base text-navy text-opacity-60">TANGGAL</th>
                <th className="px-3 font-inter-tight text-left font-semibold text-base text-navy text-opacity-60 uppercase">Jumlah Kendaraan Kebawah</th>
                <th className="px-3 rounded-r-[8px] font-inter-tight text-left font-semibold text-base text-navy text-opacity-60 uppercase">Jumlah Kendaraan Keatas</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr className="hover:bg-slate-100 h-14 items-center" key={index}>
                  <td className="px-3 rounded-l-[8px] w-[160px] font-inter-tight text-left font-medium text-base text-neutral-black">{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td className="px-3 font-inter-tight text-left font-regular text-base text-neutral-black">{item.going_down}</td>
                  <td className="px-3 rounded-r-[8px] font-inter-tight text-left font-regular text-base text-neutral-black">{item.going_up}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default BillboardReport;
