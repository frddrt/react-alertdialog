/**
 * @author Frederico Ferracini Duarte
 * @since 2024-03-25 17:09:49
 */

import * as React from 'react'
import styles from './styles.module.css'

export interface AlertButtonProps {
	text: string
	onClick?: () => void
	background?: string
	color?: string
	width?: string
}

export interface AlertDialogProps {
	title?: string
	titlebg?: string
	titlecolor?: string
	titlesize?: string
	show?: boolean
	onHide?: () => void
	type?: 'alert' | 'info' | 'stop' | 'question'
	children?: React.ReactChild
	message?: string
	hideClose?: boolean
	buttons?: Array<AlertButtonProps>
}

export const AlertDialog = (props: AlertDialogProps) => (
	<div className={styles.modalBackground} hidden={! props.show}>
		<div className={styles.modalWindow}>
			<AlertDialogHead {...props} />
			<AlertDialogBody {...props} />
			<AlertDialogFooter {...props} />
		</div>
	</div>
)

const AlertDialogHead = (props: AlertDialogProps) => {
	const Icon = () => {
		switch (props.type) {
			case 'alert': return (<YellowTriangle />)
			case 'info': return (<BlueCircle />)
			case 'stop': return (<RedOctagon />)
			case 'question' : return (<PurpleCircle />)
			default: return (<BlueCircle />)
		}
	}

	return (
		<div className={styles.modalTitle} style={{
			background: props.titlebg,
			color: props.titlecolor,
			fontSize: props.titlesize,
		}}>
			<div>
				<Icon />
			</div>
			<div>
				{props.title}
			</div>
			<div className={styles.modalDivClose}>
				<button onClick={props.onHide} hidden={props.hideClose}>
					x
				</button>
			</div>
		</div>
	)
}

const AlertDialogBody = (props: AlertDialogProps) => (
	<div className={styles.modalBody}>
		{(props.message) ? props.message : props.children}
	</div>
)

const AlertDialogFooter = (props: AlertDialogProps) => {
	const buttons: Array<AlertButtonProps> = (() => {
		const defaultButton: AlertButtonProps = {
			text: "Ok",
			width: "5em",
		}

		if (props.buttons === undefined || props.buttons.length === 0) {
			return [defaultButton]
		} else {
			return props.buttons
		}
	})()

	return (
		<div className={styles.modalFooter}>
			{buttons.map((b: AlertButtonProps, i: number) => (
				<ModalButton
					key={i}
					button={b}
					onHide={props.onHide} />
			))}
		</div>
	)
}

const ModalButton = ({button, onHide}: {button: AlertButtonProps, onHide?: () => void}) => (
	<span
		className={styles.modalButton}
		style={{background: button.background, color: button.color, width: button.width}}
		onClick={() => {
			if (button.onClick) button.onClick()
			if (onHide) onHide()
		}
	}>
		{button.text}
	</span>
)

const YellowTriangle = () => (
	<div style={{
		clipPath: 'polygon(50% 0%, 80% 95%, 20% 95%)',
		background: 'black',
	}}>
		<div style={{
			clipPath: 'polygon(50% 10%, 75% 90%, 25% 90%)',
			background: 'yellow',
			textAlign: 'center'
		}}>!</div>
	</div>
)

const BlueCircle = () => (
	<div style={{
		clipPath: 'circle(36% at 50% 50%)',
		background: 'rgb(24, 141, 244)'
	}}>
		<div style={{
			clipPath: 'circle(31% at 50% 50%)',
			background: 'white',
			textAlign: 'center',
			color: 'rgb(24, 141, 244)',
		}}>!</div>
	</div>
)

const PurpleCircle = () => (
	<div style={{
		clipPath: 'circle(36% at 50% 50%)',
		background: 'green'
	}}>
		<div style={{
			clipPath: 'circle(31% at 50% 50%)',
			background: 'white',
			textAlign: 'center',
			color: 'green',
		}}>?</div>
	</div>
)

const RedOctagon = () => {
	const p1 = [
		[ 35,   0],
		[ 65,   0],
		[ 85,  30],
		[ 85,  70],
		[ 65, 100],
		[ 35, 100],
		[ 15,  70],
		[ 15,  30],
	]
	const p2 = [
		[37,  10],
		[63,  10],
		[80,  35],
		[80,  65],
		[63,  90],
		[37,  90],
		[20,  65],
		[20,  35],
	]

	const pRed = `polygon(${p1.map(p => p.map(x => `${x}%`).join(' ')).join(', ')})`
	const pWhite = `polygon(${p2.map(p => p.map(x => `${x}%`).join(' ')).join(', ')})`

	return (
		<div style={{
			clipPath: pRed,
			background: 'red'
		}}>
			<div style={{
				clipPath: pWhite,
				background: 'white',
				textAlign: 'center',
				color: 'red'
			}}>!</div>
		</div>
	)
}
