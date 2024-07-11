import { AlertDialog, Button, Center } from 'native-base'
import React from 'react'

const CustomAlert = ({
  isOpen,
  setIsOpen,
  title,
  text,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  text: string
}) => {
  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{text}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button colorScheme="danger" onPress={onClose}>
                Cerrar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default CustomAlert
