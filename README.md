# react-alertdialog

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-alertdialog.svg)](https://www.npmjs.com/package/@ferracinitec/react-alertdialog) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-alertdialog
```

## Usage

```tsx
import React, { useState } from 'react'

import { AlertDialog, AlertDialogProps } from 'react-alertdialog'
import 'react-alertdialog/dist/index.css'

const App = () => {
	const [text, setText] = useState<string>('Wait response...')
	const [show, setShow] = useState<boolean>(false)
	const [alert, setAlert] = useState<AlertDialogProps>({
		type: "info",
		message: "",
		show: false,
	})

	const onYes = () => {
		setAlert({
			type: "info",
			title: "Confirmed",
			message: "Proceeding...",
			show: true,
		})
	}

	const onNo = () => {
		setAlert({
			type: "stop",
			title: "Canceled",
			message: "Aborting...",
			show: true,
		})
	}

	return (
		<div style={{padding: "2em"}}>
			<button onClick={() => {
				setShow(true)
				setText('Wait response...')
			}}>{text}</button>
			<AlertDialog
				type="question"
				title="Making a question"
				hideClose
				show={show}
				onHide={() => setShow(false)}
				buttons={[
					{text: 'Yes', onClick: onYes, background: 'green', color: 'white', width: '5em'},
					{text: 'No', onClick: onNo, background: 'red', color: 'white', width: '5em'}
				]}>
				<span style={{fontSize: 25}}>Do you proceed?</span>
			</AlertDialog>
			<AlertDialog
				type={alert.type!}
				title={alert.title!}
				hideClose
				show={alert.show!}
				message={alert.message}
				onHide={() => setAlert({...alert, show: false})} />
		</div>
	)
}

export default App
```

## License

MIT © [frddrt](https://github.com/frddrt)
