/** @format */

import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/router'
import { db } from '../../firebase'
import { signOut, getSession, useSession } from 'next-auth/react'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import Login from '../../components/Login'
import { useEffect, useState } from 'react'
import TextEditor from '../../components/TextEditor'

function Doc() {
	const { data: session } = useSession()
	const router = useRouter()
	const [docs, setDocs] = useState([])

	const { id } = router.query

	useEffect(() => {
		const userDoc = async () => {
			const data = await getDocs(collection(db, 'userDocs'))
			setDocs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		}
		userDoc()
	}, [])

	console.log(docs)

	if (!session) return <Login />

	return (
		<div>
			<header className='flex justify-between items-center p-3 pb-1'>
				<span onClick={() => router.push('/')} className='cursor-pointer'>
					<Icon name='description' size='5xl' color='blue' />
				</span>

				<div className='flex-grow  px-2'>
					<h2 className='flex mr-5'>{docs?.fileName}</h2>
					<div className='flex items-center text-sm -ml-1 h-8 text-gray-600 space-x-1'>
						<p className='option'>File</p>
						<p className='option'>Edit</p>
						<p className='option'>View</p>
						<p className='option'>Insert</p>
						<p className='option'>Format</p>
						<p className='option'>Tools</p>
					</div>
				</div>

				<Button
					color='lightBlue'
					buttonType='filled'
					size='regular'
					className='hidden md:!inline-flex h-10'
					rounded={false}
					block={false}
					iconOnly={false}
					ripple='light'>
					<Icon name='people' size='md' /> SHARE
				</Button>

				<img
					onClick={signOut}
					className='cursor-pointer h-10 w-10 rounded-full ml-2'
					src={session.user.image}
					alt=''
				/>
			</header>
			<TextEditor />
		</div>
	)
}

export default Doc

export async function getServerSideProps(context) {
	const session = await getSession(context)

	return {
		props: {
			session,
		},
	}
}
