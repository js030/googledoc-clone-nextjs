/** @format */

import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useEffect, useState } from 'react'
import DocumentRow from '../components/DocumentRow'
import {
	collection,
	addDoc,
	serverTimestamp,
	getDocs,
	doc,
	query,
} from 'firebase/firestore'
import { db } from '../firebase'

export default function Home() {
	const { data: session } = useSession()
	const [showModal, setShowModal] = useState(false)
	const [input, setInput] = useState('')
	const [docs, setDocs] = useState([])

	useEffect(() => {
		const userDoc = async () => {
			const data = await getDocs(collection(db, 'userDocs'))

			setDocs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		}
		userDoc()
	}, [])

	console.log(docs)

	if (!session) return <Login />

	const createDocument = async () => {
		if (!input) return

		try {
			const docRef = await addDoc(collection(db, 'userDocs'), {
				fileName: input,
				timestamp: serverTimestamp(),
			})
			console.log('Document written with ID: ', docRef.id)
		} catch (e) {
			console.error('Error adding document: ', e)
		}
		setInput(input)
		setShowModal(false)
	}

	const modal = (
		<Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
			<ModalBody>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type='text'
					className='outline-none w-full'
					placeholder='Enter name of document...'
					onKeyDown={(e) => e.key === 'Enter' && createDocument()}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					color='blue'
					buttonType='link'
					onClick={(e) => setShowModal(false)}
					ripple='dark'>
					Cancel
				</Button>

				<Button color='blue' onClick={createDocument} ripple='light'>
					Create
				</Button>
			</ModalFooter>
		</Modal>
	)

	return (
		<div>
			<Head>
				<title>Google Doc</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			{modal}

			<section className='bg-[#F8f9FA] pb-10 px-10'>
				<div className='max-w-3xl mx-auto'>
					<div className='py-6 flex items-center justify-between'>
						<h2 className='text-gray-700'>Start a new Document</h2>
						<Button
							color='gray'
							buttonType='outline'
							iconOnly={true}
							ripple='dark'
							className='border-0'>
							<Icon name='more_vert' size='3xl' />
						</Button>
					</div>

					<div>
						<div
							onClick={() => setShowModal(true)}
							className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
							<Image src='https://links.papareact.com/pju' layout='fill' />
						</div>
						<p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>
							Blank
						</p>
					</div>
				</div>
			</section>

			<section className='bg-white px-10 md:px-0'>
				<div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
					<div className='flex items-center justify-between pb-5'>
						<h2 className='font-medium flex-grow'>My Documents</h2>
						<p className='mr-12'>Date Created</p>
						<Icon name='folder' size='3xl' color='gray' />
					</div>
				</div>

				{docs.map((doc) => (
					<DocumentRow
						key={doc.id}
						id={doc.id}
						fileName={doc.fileName}
						date={doc.timestamp}
					/>
				))}
			</section>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)

	return {
		props: {
			session: session,
		},
	}
}
