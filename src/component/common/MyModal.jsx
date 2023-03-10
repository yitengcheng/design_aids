import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import useStateRef from "react-usestateref";

const MyModal = (props, ref) => {
  const { title, children, reset, width } = props;
  const [isModalOpen, setIsModalOpen] = useStateRef(false);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      openModal();
    },
    closeModal: () => {
      closeModal();
    },
  }));
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    reset && reset();
    setIsModalOpen(false);
  };
  return (
    <Modal width={width} title={title} open={isModalOpen} footer={null} onCancel={closeModal}>
      {children}
    </Modal>
  );
};

export default forwardRef(MyModal);
