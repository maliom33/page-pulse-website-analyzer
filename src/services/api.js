import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function analyzeWebsite(url) {
  const trimmedUrl = url.trim()

  if (!isValidUrl(trimmedUrl)) {
    throw createApiError(
      'Please enter a valid URL such as https://example.com.',
      'INVALID_URL',
    )
  }

  try {
    const response = await apiClient.post('/analyze', { url: trimmedUrl })
    return normalizeAnalysisResponse(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw createApiError(
          'Unable to reach the analysis service. Please check your connection and try again.',
          'NETWORK_ERROR',
        )
      }

      const status = error.response.status

      if (status === 400) {
        throw createApiError(
          'The provided URL is invalid. Please check the address and try again.',
          'INVALID_URL',
        )
      }

      if (status === 408 || status === 504) {
        throw createApiError(
          'The request timed out. Please try again in a moment.',
          'TIMEOUT',
        )
      }

      if (status >= 500) {
        throw createApiError(
          'The server could not process the request right now. Please try again later.',
          'SERVER_ERROR',
        )
      }

      if (status === 415) {
        throw createApiError(
          'The target page did not return HTML content. Please try another URL.',
          'NON_HTML',
        )
      }

      throw createApiError(
        'The analysis request failed. Please try again.',
        'REQUEST_ERROR',
      )
    }

    throw createApiError(
      'Something went wrong while analyzing the website.',
      'UNKNOWN_ERROR',
    )
  }
}

function normalizeAnalysisResponse(apiResponse) {
  const envelope = apiResponse ?? {}
  const payload = envelope?.data?.data ?? envelope?.data ?? {}
  const isSuccess = envelope?.success === true

  if (!isSuccess) {
    throw createApiError(envelope?.message || 'The analysis could not be completed.', 'API_ERROR')
  }

  const statusValue = payload.status ?? 0
  const statusText = formatStatusText(statusValue)
  const badgeLabel = getBadgeLabel(statusValue)
  const statusType = getStatusType(statusValue)

  return {
    status: statusValue,
    statusText,
    statusType,
    badgeLabel,
    responseTime: payload.response_time ?? '0 ms',
    title: payload.title ?? 'Untitled Page',
    metaDescription: payload.meta_description ?? '',
    h1Count: payload.h1_count ?? 0,
    missingAltImages: payload.missing_alt_images ?? 0,
    wordCount: payload.word_count ?? 0,
  }
}

function formatStatusText(status) {
  if (status === 200) return '200 OK'
  if (status === 400) return '400 Bad Request'
  if (status === 408) return '408 Request Timeout'
  if (status === 415) return '415 Unsupported Media Type'
  if (status >= 500) return '500 Server Error'
  return `${status}`
}

function getBadgeLabel(status) {
  if (status === 200) return 'Analysis Successful'
  if (status === 400) return 'Invalid URL'
  if (status === 408) return 'Timed Out'
  if (status === 415) return 'Non-HTML Page'
  if (status >= 500) return 'Server Unavailable'
  return 'Analysis Failed'
}

function getStatusType(status) {
  if (status === 200) return 'success'
  if (status === 400 || status === 415) return 'warning'
  if (status === 408 || status >= 500) return 'danger'
  return 'warning'
}

function isValidUrl(value) {
  try {
    const parsedUrl = new URL(value)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

function createApiError(message, code) {
  const error = new Error(message)
  error.code = code
  return error
}
