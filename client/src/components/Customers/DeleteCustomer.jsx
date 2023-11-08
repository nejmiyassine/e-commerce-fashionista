import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const DeleteCustomer = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className='bg-danger text-background' size='sm'> Delete</Button>
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          // backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete customer</ModalHeader>
              <ModalBody>
              
                <p>
                  Are you sure you want to delete the customer
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-red-500 text-white" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-blue-500 text-white"  onPress={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}



export default DeleteCustomer