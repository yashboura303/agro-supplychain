import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Modal from 'react-modal';

export default function Qrcode() {
   const { modalIsOpen, closeModal, batchNo } = useContext(AppContext);
   return (
      <Modal
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         className="card w-25 text-center mx-auto mt-5 border border-dark"
      >
         {/* <button onClick={closeModal}>close</button> */}
         <img src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${batchNo}`} alt="" />
      </Modal>
   );
}
