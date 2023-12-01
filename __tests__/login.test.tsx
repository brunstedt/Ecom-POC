import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '../app/login/page'

jest.mock('next/navigation', () => ({
    ...(jest.requireActual('next/navigation') as object),
    useSearchParams: () => ({get: jest.fn()})
}))

describe('Login Page', () => {

    it('renders a login form', () => {
        render(<Login />)

        const username = screen.getByRole('textbox', {
            name: /användarnamn/i,
        })
        const password = screen.getByLabelText(/lösenord/i)

        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })

    it('renders a login button', () => {
        render(<Login />)

        const button = screen.getByRole('button', {
            name: /logga in/i,
        })

        expect(button).toBeInTheDocument()
    })
})