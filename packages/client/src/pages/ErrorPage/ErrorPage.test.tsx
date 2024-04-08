import { cleanup, render } from '@testing-library/react'
import {
  ESTUB_TYPE,
  STUB_TEXT,
  STUB_TITLE,
} from '../../components/ErrorStub/models/models'
import { NotFoundPage } from './NotFoundPage'
import { ServerErrorPage } from './ServerErrorPage'
import { BrowserRouter } from 'react-router-dom'

describe('Testing Error pages', () => {
  afterEach(cleanup)

  describe('Testing NotFound page', () => {
    const pageType = ESTUB_TYPE.NOT_FOUND

    it('renders NotFound page text content', () => {
      const { getByText } = render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      )

      const pageTextContent = getByText(STUB_TEXT[pageType])
      const pageTextTitle = getByText(STUB_TITLE[pageType])

      expect(pageTextContent).toBeDefined()
      expect(pageTextTitle).toBeDefined()
    })
  })

  describe('Testing ServerError page', () => {
    const pageType = ESTUB_TYPE.INTERNAL_SERVICE_ERROR

    it('renders ServerError page text content', () => {
      const { getByText } = render(
        <BrowserRouter>
          <ServerErrorPage />
        </BrowserRouter>
      )
      const pageTextContent = getByText((_, element) => {
        const hasText = (element: Element | null) =>
          element?.textContent === STUB_TEXT[pageType]
        const elementHasText = hasText(element)
        const childrenDontHaveText = Array.from(element?.children || []).every(
          child => !hasText(child)
        )
        return elementHasText && childrenDontHaveText
      })
      const pageTextTitle = getByText(STUB_TITLE[pageType])

      expect(pageTextContent).toBeDefined()
      expect(pageTextTitle).toBeDefined()
    })
  })
})
