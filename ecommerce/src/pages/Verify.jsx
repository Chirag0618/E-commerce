import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyAccount } from '../api/userAPI'

const Verify = () => {
    const params = useParams()
    // {token:'2e6d26b1cff4b51865b27eb3a41528c8281a00939a069323'}
    const token = params.token
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')

    useEffect(() => {
        verifyAccount(token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
                }
            })
    }, [])
    return (
        <>
            {
                error && <div className='bg-danger-subtle text-center py-5'>{error}</div>
            }

            {
                success && <div className='bg-success-subtle text-center py-5'>{success}</div>
            }
        </>
    )
}

export default Verify
