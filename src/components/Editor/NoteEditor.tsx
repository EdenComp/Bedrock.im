import React, { useEffect, useState } from 'react'
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
  const savedNote = localStorage.getItem('note') || undefined
  // @ts-expect-error currently not used but will be really soon
  const savedEncryptState = localStorage.getItem('encrypt') === 'true'
  const [note, setNote] = useState<RawDraftContentState | undefined>(savedNote && JSON.parse(savedNote))

  const handleSave = () => {
    localStorage.removeItem('note')
    setNote(undefined)
  }

  const handleEncryptToggle = (state: boolean) => {
    localStorage.setItem('encrypt', state.toString())
  }

  useEffect(() => {
    if (note)
      localStorage.setItem('note', JSON.stringify(note))
  }, [note])

  return (
    <Editor
      toolbarCustomButtons={[
        <SaveButton onSave={handleSave} />,
        <EncryptToggleButton onEncryptToggle={handleEncryptToggle} />,
      ]}
      editorStyle={{width: '70vw'}}
      onChange={state => setNote(state)}
      contentState={note} {...props} />
  )
}

export default NoteEditor
