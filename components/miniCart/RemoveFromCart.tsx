import { twMerge } from 'tailwind-merge'
import Icon from '../icon/Icon'
import { useFormStatus } from 'react-dom'

export default function RemoveFromCartButton() {
    const { pending } = useFormStatus()

    return (<button 
        className={twMerge(
            'border rounded-full border-red-100 p-1 text-red-400 hover:bg-red-100',
            pending && 'pointer-events-none opacity-50 text-gray-400'
        )} 
        type="submit"><Icon name='trash'/></button>)
}