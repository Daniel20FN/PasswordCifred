import { AlertDialog, Button, Center } from 'native-base'
import React from 'react'

const CustomAlertAccept = ({
  isOpen,
  setIsOpen,
  title,
  text,
  onAccept, // Función pasada como prop
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  text: string
  onAccept: () => Promise<void>
}) => {
  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)

  const handleAccept = () => {
    onAccept()
    onClose()
  }

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
              <Button colorScheme="primary" onPress={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={handleAccept}>
                Aceptar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default CustomAlertAccept
