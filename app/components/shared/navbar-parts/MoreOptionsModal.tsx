import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Modal } from "antd";
import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";
import { PulseLoader } from "react-spinners";

type ModalProps = {
  profilePic: StaticImageData;
};

export default function MoreOptionsModal({ profilePic }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    setIsSigningOut(true);
    signOut();
  };

  return (
    <>
      <button
        onClick={showModal}
        className="max-w-[250px] lg:w-full rounded-full focus:outline-onlyfans-blue text-base flex items-center gap-4"
        aria-label="My Profile"
      >
        <Image
          src={profilePic}
          alt="Your profile picture"
          className="w-11 rounded-full"
        />
      </button>
      <Modal
        title="More Options"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ className: "hidden" }}
        onCancel={handleCancel}
        cancelButtonProps={{ className: "hidden" }}
        cancelText="Close"
        className="max-w-[240px]"
      >
        <button
          onClick={handleSignOut}
          className={`flex items-center gap-2 text-white font-semibold w-full text-start px-3 mt-4 -ml-2.5 rounded-full h-8 transition-colors duration-100 ${
            isSigningOut
              ? "bg-onlyfans-blue"
              : "bg-onlyfans-light-blue hover:bg-onlyfans-blue"
          }`}
        >
          <TbLogout2 className="text-xl" />
          {isSigningOut ? <p>Loading</p> : <p>Sign Out</p>}

          <PulseLoader
            color="#ffffff"
            size={4}
            loading={isSigningOut}
            className="ml-auto"
          />
        </button>
      </Modal>
    </>
  );
}
