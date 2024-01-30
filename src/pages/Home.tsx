import Imgslide from "../components/Imgslide";
import AddBuilding from "../components/Popup/AddBuilding";
import Building from "../components/Building";
import { FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="mx-5 md:mx-10 mt-5 mb-10">
      {/* <Imgslide /> */}
      <div className="flex my-4 items-center justify-between">
        <p className="font-bold">All Building</p>
        <div className="flex justify-center items-center text-xl">
          <AddBuilding />
          <PencilSquareIcon width={25} className="ml-6" />
          <FunnelIcon width={24} className="ml-6" />
        </div>
      </div>
      <Building />
    </div>
  );
}
