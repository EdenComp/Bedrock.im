import React, { useCallback, useEffect, useState } from 'react'
import { Editor, RawDraftContentState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useAlephAccount } from '../../context/useAlephAccount.tsx'
import { useCreatePost } from '../../utils/query.ts'

type SaveButtonProps = {
  onSave: () => void
}

type EncryptToggleButtonProps = {
  onEncryptToggle: (state: boolean) => void
  checked: boolean
}

const EMPTY_EDITOR_STATE = {blocks: [], entityMap: {}}

const SaveButton: React.FC<SaveButtonProps> = ({onSave}) =>
  <button className="text-black" onClick={onSave}>Save</button>
const EncryptToggleButton: React.FC<EncryptToggleButtonProps> = ({onEncryptToggle, checked}) =>
  <input checked={checked} onChange={event => onEncryptToggle(event.target.checked)} type="checkbox" />


const NoteEditor: React.FC<Editor['props']> = (props) => {
  const alephAccount = useAlephAccount()
  const savedNote = localStorage.getItem('note') ?? undefined
  const savedEncryptionToggled = localStorage.getItem('encrypt') === 'true'
  const parsedNote = savedNote ? JSON.parse(savedNote) as RawDraftContentState : EMPTY_EDITOR_STATE
  const [isEncryptionToggled, setEncryptionToggled] = useState<boolean>(savedEncryptionToggled)
  const [note, setNote] = useState(parsedNote)

  useEffect(() => localStorage.setItem('encrypt', isEncryptionToggled.toString()), [isEncryptionToggled])
  useEffect(() => localStorage.setItem('note', JSON.stringify(note)), [note])

  const {mutateAsync: createNoteAsync} = useCreatePost()

  const submitNote = useCallback(async () => {
    if (!alephAccount) throw new Error('No Aleph account found')
    if (note.blocks.every(block => block.text === '')) throw new Error('Empty note')
    let bufferNote = Buffer.from(JSON.stringify(note), 'utf8')
    if (isEncryptionToggled)
      bufferNote = Buffer.from(await alephAccount.encrypt(bufferNote))
    await createNoteAsync({
      content: {
        secret: savedEncryptionToggled,
        note: bufferNote.toString('base64'),
      },
      account: alephAccount,
    })
  }, [alephAccount, createNoteAsync, note, isEncryptionToggled])

  const handleSave = () => submitNote()

  return (
    <Editor
      toolbarCustomButtons={[
        <SaveButton onSave={handleSave} />,
        <EncryptToggleButton checked={isEncryptionToggled} onEncryptToggle={setEncryptionToggled} />,
      ]}
      editorStyle={{width: '70vw'}}
      onChange={setNote}
      defaultContentState={note}  {...props} />
  )
}

export default NoteEditor
