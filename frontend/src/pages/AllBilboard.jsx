import BillboardItem from "../components/BillboardItem";
import Rectangle215 from "../assets/Rectangle215.png";
import TopBar from "../components/topbar/TopBar";
import '../../src/index.css';

function AllBillboard() {

    const billboards = [
        {
          id: 1,
          image: Rectangle215,
          size: "4x8",
          address: "Jl. Raya Bogor, No. 5, Jakarta"
        },
        {
          id: 1,
          image: Rectangle215,
          size: "4x8",
          address: "Jl. Raya Bogor, No. 5, Jakarta"
        },
        {
          id: 1,
          image: Rectangle215,
          size: "4x8",
          address: "Jl. Raya Bogor, No. 5, Jakarta"
        },
        {
          id: 1,
          image: Rectangle215,
          size: "4x8",
          address: "Jl. Raya Bogor, No. 5, Jakarta"
        },
      ];

    return (
      <div className="flex flex-col">
        <TopBar title="All Billboards" />
        <div className="safe-area-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {billboards.map((billboard) => (
              <BillboardItem
                key={billboard.id}
                id={billboard.id}
                image={billboard.image}
                size={billboard.size}
                address={billboard.address}
              />
            ))}
          </div>
        </div>
      </div>
    );
}

export default AllBillboard;