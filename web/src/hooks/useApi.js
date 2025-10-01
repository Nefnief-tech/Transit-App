import { useState, useEffect } from 'react'

/**
 * Custom hook for managing API calls
 * @param {Function} apiFunc - API function to call
 * @param {Array} dependencies - Dependencies to trigger refetch
 * @returns {Object} { data, loading, error, refetch }
 */
function useApi(apiFunc, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFunc()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useApi
