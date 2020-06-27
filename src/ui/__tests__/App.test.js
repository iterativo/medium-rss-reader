import React from 'react'
import { render } from '@testing-library/react'
import 'jest-mock-axios'
import App from '../App'

it('renders the search form', () => {
    const { findByLabelText } = render(<App />)
    expect(findByLabelText('form')).not.toBeUndefined()
})
