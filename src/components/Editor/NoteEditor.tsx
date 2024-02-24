import React from 'react'
import { Editor, RawDraftContentState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type SaveButtonProps = {
  onSave: () => void
}

type EncryptToggleButtonProps = {
  onEncryptToggle: (state: boolean) => void
}

const SaveButton: React.FC<SaveButtonProps> = ({onSave}) => <button onClick={onSave}>Save</button>
const EncryptToggleButton: React.FC<EncryptToggleButtonProps> = ({onEncryptToggle}) => <input
  onChange={event => onEncryptToggle(event.target.checked)} type="checkbox" />


const NoteEditor: React.FC<Editor['props']> = (props) => {
  // @ts-expect-error currently not used but will be really soon
  const savedEncryptState = localStorage.getItem('encrypt') === 'true'
  const savedNote = localStorage.getItem('note')
  const parsedSavedNote = savedNote !== null ? JSON.parse(savedNote) : undefined

  const handleSave = () => {
    localStorage.removeItem('note')
  }

  const handleEncryptToggle = (state: boolean) => localStorage.setItem('encrypt', state.toString())

  const handleNoteChange = (note: RawDraftContentState) => localStorage.setItem('note', JSON.stringify(note))

  return (
    <Editor
      toolbarCustomButtons={[
        <SaveButton onSave={handleSave} />,
        <EncryptToggleButton onEncryptToggle={handleEncryptToggle} />,
      ]}
      editorStyle={{width: '70vw'}}
      onChange={handleNoteChange}
      defaultContentState={parsedSavedNote} {...props} />
  )
}

export default NoteEditor
