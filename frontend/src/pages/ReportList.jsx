import ReportItem from "../components/ReportItem";
import '../../src/index.css';
import TopBar from "../components/topbar/TopBar";
import { Link } from "react-router-dom";

function ReportList() {
  const reports = [
    { id: 1, name: "Billboard A", address: "Jl. Bunga Mawar" },
    { id: 2, name: "Billboard B", address: "Jl. Bunga Melati" },
    { id: 3, name: "Billboard C", address: "Jl. Danau Toba" },
    { id: 4, name: "Billboard D", address: "Jl. Bunga Tulip" },
    { id: 5, name: "Billboard E", address: "Jl. Bunga Matahari" },
    { id: 6, name: "Billboard F", address: "Jl. Jakarta" },
  ];

  return (
    <div className="flex flex-col">
      <TopBar title="Report" />
      <div className="safe-area-page">
        <div className="custom-card flex flex-col">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-200 h-11 items-center">
                <th className="px-3 rounded-l-[8px] w-[118px] font-inter-tight text-left font-semibold text-base text-navy text-opacity-60">BILLBOARD</th>
                <th className="px-3 font-inter-tight text-left font-semibold text-base text-navy text-opacity-60">ADDRESS</th>
                <th className="px-3 rounded-r-[8px] w-[84px] font-inter-tight font-semibold text-base text-navy text-opacity-60">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr className="hover:bg-slate-100 h-14 items-center" key={index}>
                  <td className="px-3 rounded-l-[8px] w-[118px] font-inter-tight text-left font-medium text-base text-neutral-black">{report.name}</td>
                  <td className="px-3 font-inter-tight text-left font-regular text-base text-neutral-black">{report.address}</td>
                  <td className="px-3 rounded-r-[8px] w-[84px] font-inter-tight font-semibold text-base text-center text-green hover:text-green-600">
                    <Link
                      to={`/report/${report.id}`}

                    >
                      Detail
                    </Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportList;