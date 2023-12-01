import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Booking from '../app/booking/page'

describe('Booking Page', () => {

    it('renders a links', () => {
        render(<Booking />)

        const link1 = screen.getByRole('link', {
            name: /landsort/i,
        })

        
        const link2 = screen.getByRole('link', {
            name: /downtown camper/i,
        })

        expect(link1).toBeInTheDocument()
        expect(link2).toBeInTheDocument()
    })
})