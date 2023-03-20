import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ReactMarkdown from "react-markdown";
import {getWordStr} from "../lib/utils/miscellaneous"
import Link from "next/link";

const addToCheckListModal = ({ children, header, trigger, userid, postLink }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isLoading, setIsLoading] = useState(false);


  const callAPI = async () => {
    setIsLoading(true);
    try{
        console.warn(userTask)
        const response =  await fetch('/api/closetask', {
            method: "POST",
            body: JSON.stringify({
              userTask:userTask,
              userid: userid,
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },

        });

        if(!response.ok){
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        window.location.reload(false);

    } catch (err){
        console.log(err);
    } finally{
        setIsLoading(false);
    }

  };

  return (
    <div>
      {React.cloneElement(trigger, { onClick: toggle })}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
            <div>
              


            </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MyModal;
