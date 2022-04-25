/** @format */

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'

import { db } from '../firebase'
import { addDoc, collection, setDoc } from 'firebase/firestore'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'
import { useSession } from 'next-auth/react'

const Editor = dynamic(
	() => import('react-draft-wysiwyg').then((module) => module.Editor),
	{
		ssr: false,
	}
)

function TextEditor() {
	const { data: session } = useSession()
	const router = useRouter()
	const { id } = router.query

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	return (
		<div className='bg-[#F8F9FA] min-h-screen pb-16'>
			<Editor
				editorState={editorState}
				toolbarClassName='flex sticky top-0 z-50 justify-center mx-auto'
				editorClassName='mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12
                 border '
			/>
		</div>
	)
}

export default TextEditor
