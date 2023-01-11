import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ReactMarkdown from "react-markdown";
import {getWordStr} from "../lib/utils/miscellaneous"
import Link from "next/link";

const MyModal = ({ children, header, trigger, taskid, userid, userTask, postLink }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isLoading, setIsLoading] = useState(false);


  const callAPI = async () => {
    setIsLoading(true);
    try{
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
            <div className="row">
                <div className="col-sm-8">
                    <ReactMarkdown >{getWordStr(children, 50)+"... "+`[Read More](/post/${postLink})`}</ReactMarkdown>
      
                        
                </div>
                <div className="col-sm-4">
                    Ads
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={callAPI}>Complete</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyModal;
