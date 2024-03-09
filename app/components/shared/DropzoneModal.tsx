import { Modal } from "antd";
import DropzoneUploader from "./DropzoneUploader";
import { useSelector, useDispatch } from "react-redux";
import { setToFalse } from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";
import { IoClose } from "react-icons/io5";

export default function DropzoneModal() {
  const isOpen = useSelector(
    (state: RootState) => state.uploadMediaModal.isOpen
  );
  const dispatch = useDispatch();
  return (
    <Modal
      open={isOpen}
      onCancel={() => dispatch(setToFalse())}
      footer={false}
      closeIcon={false}
      className="relative flex p-5"
    >
      <DropzoneUploader />
      <button
        onClick={() => dispatch(setToFalse())}
        className="absolute top-0 right-0 m-1"
      >
        <IoClose className="hover:text-gray-600 transition-all" />
      </button>
    </Modal>
  );
}
