import Layout from '../components/Landing/Layout.tsx'
import { ReactElement } from 'react'
import NoteEditor from '../components/Editor/NoteEditor.tsx'

export default function Notes(): ReactElement {
  return (
    <Layout>
      <NoteEditor />
    </Layout>
  )
}
