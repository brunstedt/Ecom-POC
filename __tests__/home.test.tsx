import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {

    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /top of minds go/i,
        })

        expect(heading).toBeInTheDocument()
    })

    it('renders a logout button', () => {
        render(<Home />)

        const button = screen.getByRole('button', {
            name: /log out/i,
        })

        expect(button).toBeInTheDocument()
    })
})