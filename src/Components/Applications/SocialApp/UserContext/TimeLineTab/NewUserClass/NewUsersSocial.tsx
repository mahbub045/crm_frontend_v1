import { ELANAHeading, ImagePath } from "@/Constant";
import Image from "next/image";
import { MoreVertical } from "react-feather";

const NewUsersSocial = () => {
  return (
    <div className="new-users-social">
     <div className="d-flex gap-3">
        <Image width={58} height={58} className="rounded-circle image-radius m-r-15" src={`${ImagePath}/user/1.jpg`} alt="user121"/>
        <div className="flex-grow-1">
          <h4 className="mb-0 f-w-700">{ELANAHeading}</h4>
          <p>January, 12,2024</p>
        </div>
        <span className="pull-right mt-0">
          <MoreVertical />
        </span>
      </div>
    </div>
  );
};

export default NewUsersSocial;
