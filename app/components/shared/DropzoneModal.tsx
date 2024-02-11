import { Modal } from "antd";
import DropzoneUploader from "./DropzoneUploader";
import { useSelector, useDispatch } from "react-redux";
import { toggle, setToFalse } from "@/app/libs/redux/uploadMediaModalSlice";
import { RootState } from "@/app/libs/redux/store";

export default function DropzoneModal() {
  const isOpen = useSelector(
    (state: RootState) => state.uploadMediaModal.isOpen
  );
  const dispatch = useDispatch();
  return (
    <Modal open={isOpen} onCancel={() => dispatch(setToFalse())} footer={false}>
      <DropzoneUploader />
    </Modal>
  );
}
